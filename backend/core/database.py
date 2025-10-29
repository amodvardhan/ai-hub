"""
Database Setup and Session Management
"""
from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.orm import declarative_base
from loguru import logger

from core.config import settings

# Create async engine
engine = create_async_engine(
    settings.DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://"),
    pool_size=settings.DB_POOL_SIZE,
    max_overflow=settings.DB_MAX_OVERFLOW,
    echo=settings.is_development,
)

# Create session factory
AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)

# Base for models
Base = declarative_base()


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """
    Database session dependency
    Usage: db: AsyncSession = Depends(get_db)
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


async def init_database():
    """Initialize database - create all tables"""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    logger.info("Database initialized")


async def close_database():
    """Close database connections"""
    await engine.dispose()
    logger.info("Database connections closed")
