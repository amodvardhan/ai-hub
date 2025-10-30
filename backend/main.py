"""
AI Hub - Main Application
Enterprise GenAI Applications
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
from projects.rfp_evaluation.routes import router as rfp_router
from projects.report_generation.routes import router as report_router

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
    logger.info("🚀 Starting AI Hub - Enterprise GenAI Platform")
    await init_database()
    logger.info(f"✅ Environment: {settings.ENVIRONMENT}")
    logger.info(f"📝 API Docs: http://{settings.HOST}:{settings.PORT}/docs")
    logger.info("📊 Applications: RFP Evaluation, Report Generation")
    yield
    logger.info("🛑 Shutting down AI Hub...")
    await close_database()
    logger.info("✅ Shutdown complete")


# Create app
app = FastAPI(
    title="AI Hub - Enterprise GenAI Platform",
    version=settings.APP_VERSION,
    description="""
    Enterprise-grade GenAI applications for business automation.
    
    **Current Applications:**
    - RFP Evaluation: AI-powered RFP analysis and scoring
    - Report Generation: Automated report creation (Coming Soon)
    
    **Features:**
    - Multi-tenant support
    - Enterprise security
    - Usage tracking
    - Audit logging
    """,
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
        "environment": settings.ENVIRONMENT,
        "applications": ["rfp_evaluation", "report_generation"]
    }

# Root
@app.get("/")
async def root():
    return {
        "message": "AI Hub - Enterprise GenAI Platform",
        "version": settings.APP_VERSION,
        "applications": [
            {
                "name": "RFP Evaluation",
                "endpoint": "/api/v1/rfp",
                "status": "active"
            },
            {
                "name": "Report Generation",
                "endpoint": "/api/v1/reports",
                "status": "coming_soon"
            }
        ],
        "docs": "/docs" if settings.is_development else None
    }

# Register applications
app.include_router(auth_router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(rfp_router, prefix="/api/v1/rfp", tags=["RFP Evaluation"])
app.include_router(report_router, prefix="/api/v1/reports", tags=["Report Generation"])

logger.info("✅ All applications registered")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.RELOAD
    )
