"""Base Response Schemas - Match Frontend"""
from pydantic import BaseModel, Field
from typing import Generic, TypeVar, List, Optional, Dict, Any
from datetime import datetime

T = TypeVar('T')


class ErrorDetail(BaseModel):
    code: str
    message: str
    details: Dict[str, Any] = {}


class BaseResponse(BaseModel):
    success: bool = True
    message: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class DataResponse(BaseResponse, Generic[T]):
    """Matches frontend DataResponse<T>"""
    data: T


class ErrorResponse(BaseResponse):
    """Matches frontend ErrorResponse"""
    success: bool = False
    error: ErrorDetail
    path: Optional[str] = None


class PaginationMeta(BaseModel):
    page: int = 1
    page_size: int = 10
    total: int = 0


class PaginatedResponse(BaseResponse, Generic[T]):
    data: List[T]
    pagination: PaginationMeta
