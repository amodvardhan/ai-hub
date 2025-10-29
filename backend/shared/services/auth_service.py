"""Authentication Service"""
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from loguru import logger
from fastapi import APIRouter, Depends

from shared.models.user import User
from shared.schemas.user import UserCreate, UserLogin, TokenResponse, UserResponse
from shared.schemas.base import DataResponse
from core.security import hash_password, verify_password, create_access_token, create_refresh_token
from core.exceptions import UnauthorizedException, ValidationException
from core.config import settings
from core.database import get_db
from core.dependencies import get_current_user


class AuthService:
    @staticmethod
    async def register(user_data: UserCreate, db: AsyncSession) -> User:
        """Register new user"""
        # Check if exists
        result = await db.execute(select(User).where(User.email == user_data.email))
        if result.scalar_one_or_none():
            raise ValidationException("Email already registered")
        
        # Create user
        user = User(
            email=user_data.email,
            full_name=user_data.full_name,
            hashed_password=hash_password(user_data.password),
            roles=["user"]
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)
        
        logger.info(f"✅ User registered: {user.email}")
        return user
    
    @staticmethod
    async def login(credentials: UserLogin, db: AsyncSession) -> tuple[User, TokenResponse]:
        """Authenticate user"""
        result = await db.execute(select(User).where(User.email == credentials.email))
        user = result.scalar_one_or_none()
        
        if not user or not verify_password(credentials.password, user.hashed_password):
            raise UnauthorizedException("Invalid credentials")
        
        # Create tokens
        token_data = {"sub": str(user.id), "email": user.email, "roles": user.roles}
        access_token = create_access_token(token_data)
        refresh_token = create_refresh_token(token_data)
        
        tokens = TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            token_type="bearer",
            expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
        )
        
        logger.info(f"✅ User logged in: {user.email}")
        return user, tokens


# Router
router = APIRouter()


@router.post("/register", response_model=DataResponse[UserResponse])
async def register(user_data: UserCreate, db: AsyncSession = Depends(get_db)):
    """Register new user"""
    user = await AuthService.register(user_data, db)
    return DataResponse(data=UserResponse.model_validate(user), message="User registered successfully")


@router.post("/login", response_model=DataResponse[dict])
async def login(credentials: UserLogin, db: AsyncSession = Depends(get_db)):
    """Login"""
    user, tokens = await AuthService.login(credentials, db)
    return DataResponse(
        data={
            "user": UserResponse.model_validate(user).model_dump(),
            "tokens": tokens.model_dump()
        },
        message="Login successful"
    )


@router.get("/me", response_model=DataResponse[UserResponse])
async def get_me(user: User = Depends(get_current_user)):
    """Get current user"""
    return DataResponse(data=UserResponse.model_validate(user), message="User info retrieved")
