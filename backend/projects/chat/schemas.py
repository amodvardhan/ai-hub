"""Chat Schemas"""
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class ChatMessageRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=5000)
    conversation_id: Optional[str] = None


class ChatMessageResponse(BaseModel):
    response: str
    conversation_id: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
