"""Error Log Model"""
from sqlalchemy import Column, String, Text, Integer
from shared.models.base import BaseModel


class ErrorLog(BaseModel):
    __tablename__ = "error_logs"
    
    error_code = Column(String(100), index=True)
    message = Column(Text)
    severity = Column(String(20), index=True)
    method = Column(String(10))
    path = Column(String(500))
    user_id = Column(Integer, nullable=True)
    stack_trace = Column(Text)
