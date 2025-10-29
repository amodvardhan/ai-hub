"""
FastAPI Dependencies
"""
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from jose import JWTError

from core.database import get_db
from core.security import decode_token
from shared.models.user import User
from sqlalchemy import select

security = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db)
) -> User:
    """Get current authenticated user"""
    try:
        payload = decode_token(credentials.credentials)
        user_id = int(payload.get("sub"))
        
        result = await db.execute(select(User).where(User.id == user_id))
        user = result.scalar_one_or_none()
        
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        
        return user
    except (JWTError, ValueError):
        raise HTTPException(status_code=401, detail="Invalid token")
