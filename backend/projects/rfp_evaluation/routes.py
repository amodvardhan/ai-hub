"""
RFP Evaluation API Routes
"""
from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import get_db
from core.dependencies import get_current_user
from shared.schemas.base import DataResponse, PaginatedResponse, PaginationMeta
from shared.models.user import User
from .schemas import RFPUploadRequest, RFPEvaluationResponse
from .services import RFPEvaluationService

router = APIRouter()


@router.post("/upload", response_model=DataResponse[RFPEvaluationResponse])
async def upload_rfp(
    file: UploadFile = File(...),
    rfp_title: str = Form(...),
    rfp_type: str = Form(None),
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Upload RFP document for evaluation
    """
    request = RFPUploadRequest(rfp_title=rfp_title, rfp_type=rfp_type)
    evaluation = await RFPEvaluationService.create_evaluation(
        file.file, file.filename, request, user, db
    )
    return DataResponse(
        data=RFPEvaluationResponse.model_validate(evaluation),
        message="RFP uploaded successfully. Use /analyze endpoint to start evaluation."
    )


@router.post("/{evaluation_id}/analyze", response_model=DataResponse[RFPEvaluationResponse])
async def analyze_rfp(
    evaluation_id: int,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Run AI analysis on uploaded RFP
    """
    evaluation = await RFPEvaluationService.analyze_rfp(evaluation_id, user, db)
    return DataResponse(
        data=RFPEvaluationResponse.model_validate(evaluation),
        message="RFP analysis completed"
    )


@router.get("/{evaluation_id}", response_model=DataResponse[RFPEvaluationResponse])
async def get_evaluation(
    evaluation_id: int,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get RFP evaluation by ID"""
    evaluation = await RFPEvaluationService.get_evaluation(evaluation_id, user, db)
    return DataResponse(
        data=RFPEvaluationResponse.model_validate(evaluation),
        message="Evaluation retrieved"
    )


@router.get("/", response_model=PaginatedResponse[RFPEvaluationResponse])
async def list_evaluations(
    skip: int = 0,
    limit: int = 10,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """List all RFP evaluations"""
    evaluations = await RFPEvaluationService.list_evaluations(user, db, skip, limit)
    
    return PaginatedResponse(
        data=[RFPEvaluationResponse.model_validate(e) for e in evaluations],
        pagination=PaginationMeta(
            page=skip // limit + 1,
            page_size=limit,
            total=len(evaluations)
        ),
        message="Evaluations retrieved"
    )
