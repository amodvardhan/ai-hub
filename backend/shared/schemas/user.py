"""User Schemas"""
from pydantic import BaseModel, EmailStr, Field
from typing import List
from datetime import datetime


class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)
    full_name: str = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str = None
    roles: List[str]
    created_at: datetime
    
    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int
