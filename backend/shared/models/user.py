"""User Model"""
from sqlalchemy import Column, String, JSON
from shared.models.base import BaseModel


class User(BaseModel):
    __tablename__ = "users"
    
    email = Column(String(255), unique=True, index=True, nullable=False)
    username = Column(String(100), unique=True, nullable=True)
    full_name = Column(String(255), nullable=True)
    hashed_password = Column(String(255), nullable=True)
    roles = Column(JSON, default=["user"], nullable=False)
    
    # Azure AD
    azure_ad_object_id = Column(String(255), unique=True, nullable=True)
    auth_provider = Column(String(50), default="local", nullable=False)
