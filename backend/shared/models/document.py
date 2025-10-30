"""
Document Models
Store uploaded documents and their metadata
"""
from sqlalchemy import Column, String, Integer, JSON, ForeignKey, Text
from shared.models.base import BaseModel


class Document(BaseModel):
    """Uploaded document metadata"""
    __tablename__ = "documents"
    
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # File info
    filename = Column(String(255), nullable=False)
    original_filename = Column(String(255), nullable=False)
    file_path = Column(String(500), nullable=False)
    file_size = Column(Integer, nullable=False)  # bytes
    file_type = Column(String(50), nullable=False)  # pdf, docx, txt
    
    # Processing
    status = Column(String(50), default="uploaded")  # uploaded, processing, completed, failed
    extracted_text = Column(Text, nullable=True)
    
    # Metadata
    num_pages = Column(Integer, nullable=True)
    metadata = Column(JSON, default={})
    
    # Project context
    project_type = Column(String(50), nullable=True)  # rfp_evaluation, report_generation
    project_id = Column(Integer, nullable=True)  # Link to specific project record
