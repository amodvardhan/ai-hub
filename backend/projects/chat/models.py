from sqlalchemy import Column, String, Integer, ForeignKey, Text
from shared.models.base import BaseModel

class Conversation(BaseModel):
    __tablename__ = "chat_conversations"

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String(255), default="New Conversation")

class Message(BaseModel):
    __tablename__ = "chat_messages"

    conversation_id = Column(Integer, ForeignKey("chat_conversations.id"))
    role = Column(String(20), nullable=False)
    content = Column(Text, nullable=False)
