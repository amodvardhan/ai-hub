"""Chat Routes"""
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import get_db
from core.dependencies import get_current_user
from shared.schemas.base import DataResponse
from shared.models.user import User
from .schemas import ChatMessageRequest, ChatMessageResponse
from .services import ChatService

router = APIRouter()


@router.post("/send", response_model=DataResponse[ChatMessageResponse])
async def send_message(
    request: ChatMessageRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Send message to AI"""
    response = await ChatService.send_message(request, user, db)
    return DataResponse(data=response, message="Message sent successfully")


@router.get("/history")
async def get_history(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get chat history"""
    return DataResponse(data={"conversations": []}, message="History retrieved")
