"""Chat Services"""
from sqlalchemy.ext.asyncio import AsyncSession
from loguru import logger

from shared.models.user import User
from .schemas import ChatMessageRequest, ChatMessageResponse
from .models import Conversation, Message


class ChatService:
    @staticmethod
    async def send_message(
        request: ChatMessageRequest,
        user: User,
        db: AsyncSession
    ) -> ChatMessageResponse:
        """Send message to AI"""
        logger.info(f"Chat message from user {user.id}")
        
        # Simple echo for now - integrate with OpenAI here
        ai_response = f"AI Echo: {request.message}"
        
        # TODO: Save to database
        
        return ChatMessageResponse(
            response=ai_response,
            conversation_id=request.conversation_id or "new-conversation"
        )
