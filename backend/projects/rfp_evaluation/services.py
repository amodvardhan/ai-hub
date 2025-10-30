"""
RFP Evaluation Services
"""
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from loguru import logger
import json
import time

from shared.models.user import User
from shared.models.document import Document
from shared.services.openai_service import openai_service
from shared.services.document_service import DocumentService
from core.ai.providers import Message
from core.exceptions import NotFoundException, ValidationException
from .models import RFPEvaluation, RFPCriterion
from .schemas import RFPUploadRequest, RFPEvaluationResponse
from .prompts import RFP_ANALYSIS_PROMPT


class RFPEvaluationService:
    """RFP Evaluation business logic"""
    
    @staticmethod
    async def create_evaluation(
        file,
        filename: str,
        request: RFPUploadRequest,
        user: User,
        db: AsyncSession
    ) -> RFPEvaluation:
        """
        Upload RFP and create evaluation
        """
        # Upload document
        document = await DocumentService.upload_document(
            file, filename, user, "rfp_evaluation", db
        )
        
        # Wait for text extraction
        if document.status != "completed":
            raise ValidationException("Document processing failed")
        
        # Create evaluation record
        evaluation = RFPEvaluation(
            user_id=user.id,
            document_id=document.id,
            rfp_title=request.rfp_title,
            rfp_type=request.rfp_type,
            status="pending"
        )
        db.add(evaluation)
        await db.commit()
        await db.refresh(evaluation)
        
        logger.info(f"✅ RFP evaluation created: {evaluation.id}")
        
        return evaluation
    
    @staticmethod
    async def analyze_rfp(
        evaluation_id: int,
        user: User,
        db: AsyncSession
    ) -> RFPEvaluation:
        """
        Run AI analysis on RFP
        """
        start_time = time.time()
        
        # Get evaluation
        result = await db.execute(
            select(RFPEvaluation)
            .where(RFPEvaluation.id == evaluation_id, RFPEvaluation.user_id == user.id)
        )
        evaluation = result.scalar_one_or_none()
        
        if not evaluation:
            raise NotFoundException("RFP Evaluation")
        
        # Get document
        result = await db.execute(
            select(Document).where(Document.id == evaluation.document_id)
        )
        document = result.scalar_one_or_none()
        
        if not document or not document.extracted_text:
            raise ValidationException("Document text not available")
        
        # Update status
        evaluation.status = "processing"
        await db.commit()
        
        try:
            # Prepare prompt
            prompt = RFP_ANALYSIS_PROMPT.format(rfp_text=document.extracted_text[:15000])
            
            # Call AI
            messages = [Message(role="user", content=prompt)]
            response = await openai_service.chat_completion(
                messages=messages,
                model="gpt-4",
                temperature=0.3,
                max_tokens=2000
            )
            
            # Parse AI response
            try:
                analysis = json.loads(response.content)
            except:
                # If not JSON, create structured response
                analysis = {
                    "summary": response.content,
                    "key_requirements": [],
                    "compliance_score": None,
                    "risk_assessment": {},
                    "recommendations": []
                }
            
            # Update evaluation
            evaluation.evaluation_summary = analysis.get("summary", "")
            evaluation.key_requirements = analysis.get("key_requirements", [])
            evaluation.compliance_score = analysis.get("compliance_score")
            evaluation.risk_assessment = analysis.get("risk_assessment", {})
            evaluation.recommendations = analysis.get("recommendations", [])
            evaluation.ai_model_used = response.model
            evaluation.tokens_used = response.tokens_used
            evaluation.processing_time_ms = int((time.time() - start_time) * 1000)
            evaluation.status = "completed"
            
            await db.commit()
            await db.refresh(evaluation)
            
            logger.info(f"RFP analysis completed: {evaluation.id}")
            
            return evaluation
            
        except Exception as e:
            logger.error(f"RFP analysis failed: {e}")
            evaluation.status = "failed"
            await db.commit()
            raise
    
    @staticmethod
    async def get_evaluation(
        evaluation_id: int,
        user: User,
        db: AsyncSession
    ) -> RFPEvaluation:
        """Get evaluation by ID"""
        result = await db.execute(
            select(RFPEvaluation)
            .where(RFPEvaluation.id == evaluation_id, RFPEvaluation.user_id == user.id)
        )
        evaluation = result.scalar_one_or_none()
        
        if not evaluation:
            raise NotFoundException("RFP Evaluation")
        
        return evaluation
    
    @staticmethod
    async def list_evaluations(
        user: User,
        db: AsyncSession,
        skip: int = 0,
        limit: int = 10
    ) -> list[RFPEvaluation]:
        """List all evaluations for user"""
        result = await db.execute(
            select(RFPEvaluation)
            .where(RFPEvaluation.user_id == user.id)
            .order_by(RFPEvaluation.created_at.desc())
            .offset(skip)
            .limit(limit)
        )
        return result.scalars().all()
