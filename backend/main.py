"""
AI Hub - Main Application
"""
from fastapi import FastAPI
from contextlib import asynccontextmanager
from loguru import logger
import sys

from core.config import settings
from core.database import init_database, close_database
from core.exceptions import setup_exception_handlers
from core.middleware import setup_middleware

# Import routers
from shared.services.auth_service import router as auth_router
from projects.chat.routes import router as chat_router
from projects.document_analysis.routes import router as document_router
from projects.vision.routes import router as vision_router

# Setup logging
logger.remove()
logger.add(
    sys.stdout,
    colorize=True,
    format="<green>{time:HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan> - <level>{message}</level>",
    level=settings.LOG_LEVEL
)
logger.add("logs/app.log", rotation="500 MB", retention="30 days", level=settings.LOG_LEVEL)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifecycle"""
    logger.info("🚀 Starting AI Hub...")
    await init_database()
    logger.info(f"AI Hub started - Environment: {settings.ENVIRONMENT}")
    logger.info(f"API Docs: http://{settings.HOST}:{settings.PORT}/docs")
    yield
    logger.info("Shutting down AI Hub...")
    await close_database()
    logger.info("Shutdown complete")


# Create app
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AI Hub with Multiple AI Applications",
    lifespan=lifespan,
    docs_url="/docs" if settings.is_development else None,
    redoc_url="/redoc" if settings.is_development else None,
)

# Setup
setup_middleware(app)
setup_exception_handlers(app)

# Health check
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "version": settings.APP_VERSION,
        "environment": settings.ENVIRONMENT
    }

# Root
@app.get("/")
async def root():
    return {
        "message": f"Welcome to {settings.APP_NAME}",
        "version": settings.APP_VERSION,
        "docs": "/docs" if settings.is_development else None
    }

# Register all projects
app.include_router(auth_router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(chat_router, prefix="/api/v1/chat", tags=["Chat AI"])
app.include_router(document_router, prefix="/api/v1/documents", tags=["Document AI"])
app.include_router(vision_router, prefix="/api/v1/vision", tags=["Vision AI"])

logger.info("All projects registered")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.RELOAD
    )
