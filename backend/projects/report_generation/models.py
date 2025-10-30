"""
Report Generation Models
"""
from sqlalchemy import Column, String, Integer, ForeignKey, JSON, Text
from shared.models.base import BaseModel


class ReportGeneration(BaseModel):
    """Report Generation Project"""
    __tablename__ = "report_generations"
    
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Report Details
    report_title = Column(String(500), nullable=False)
    report_type = Column(String(100), nullable=True)  # executive, technical, financial
    
    # Input
    input_documents = Column(JSON, default=[])  # List of document IDs
    report_parameters = Column(JSON, default={})
    
    # Generation
    status = Column(String(50), default="pending")
    generated_content = Column(Text, nullable=True)
    
    # Output
    output_format = Column(String(50), default="pdf")  # pdf, docx, html
    output_file_path = Column(String(500), nullable=True)
