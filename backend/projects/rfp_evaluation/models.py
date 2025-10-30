"""
RFP Evaluation Models
"""
from sqlalchemy import Column, String, Integer, ForeignKey, JSON, Float, Text
from sqlalchemy.orm import relationship
from shared.models.base import BaseModel


class RFPEvaluation(BaseModel):
    """RFP Evaluation Project"""
    __tablename__ = "rfp_evaluations"
    
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    document_id = Column(Integer, ForeignKey("documents.id"), nullable=False)
    
    # RFP Details
    rfp_title = Column(String(500), nullable=False)
    rfp_type = Column(String(100), nullable=True)  # government, commercial, etc.
    
    # Evaluation
    status = Column(String(50), default="pending")  # pending, processing, completed, failed
    
    # AI Analysis Results
    evaluation_summary = Column(Text, nullable=True)
    key_requirements = Column(JSON, default=[])
    compliance_score = Column(Float, nullable=True)  # 0-100
    risk_assessment = Column(JSON, default={})
    recommendations = Column(JSON, default=[])
    
    # Metadata
    ai_model_used = Column(String(100), nullable=True)
    processing_time_ms = Column(Integer, nullable=True)
    tokens_used = Column(Integer, default=0)


class RFPCriterion(BaseModel):
    """Individual evaluation criterion"""
    __tablename__ = "rfp_criteria"
    
    evaluation_id = Column(Integer, ForeignKey("rfp_evaluations.id"), nullable=False)
    
    criterion_name = Column(String(255), nullable=False)
    criterion_type = Column(String(100))  # technical, financial, experience
    description = Column(Text)
    
    # Scoring
    weight = Column(Float, default=1.0)
    score = Column(Float, nullable=True)  # 0-10
    ai_assessment = Column(Text, nullable=True)
    
    # Evidence
    supporting_text = Column(Text, nullable=True)
    page_references = Column(JSON, default=[])
