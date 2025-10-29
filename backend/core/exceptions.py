"""
Custom Exceptions and Error Handlers
"""
from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from datetime import datetime
from loguru import logger

from shared.schemas.base import ErrorResponse, ErrorDetail


class AIHubException(Exception):
    """Base exception"""
    def __init__(self, message: str, code: str = "ERROR", status_code: int = 500):
        self.message = message
        self.code = code
        self.status_code = status_code
        super().__init__(message)


class NotFoundException(AIHubException):
    def __init__(self, resource: str):
        super().__init__(f"{resource} not found", "NOT_FOUND", 404)


class UnauthorizedException(AIHubException):
    def __init__(self, message: str = "Unauthorized"):
        super().__init__(message, "UNAUTHORIZED", 401)


class ValidationException(AIHubException):
    def __init__(self, message: str):
        super().__init__(message, "VALIDATION_ERROR", 422)


async def log_error_to_db(request: Request, error: Exception):
    """Log error to database"""
    try:
        from shared.services.error_service import ErrorService
        from core.database import AsyncSessionLocal
        
        async with AsyncSessionLocal() as db:
            await ErrorService.log_error(
                error_code=getattr(error, 'code', 'UNKNOWN'),
                message=str(error),
                severity="error",
                method=request.method,
                path=request.url.path,
                db=db
            )
    except Exception as e:
        logger.error(f"Failed to log error to DB: {e}")


async def aihub_exception_handler(request: Request, exc: AIHubException):
    """Handle custom exceptions"""
    await log_error_to_db(request, exc)
    
    return JSONResponse(
        status_code=exc.status_code,
        content=ErrorResponse(
            success=False,
            message=exc.message,
            timestamp=datetime.utcnow(),
            error=ErrorDetail(code=exc.code, message=exc.message),
            path=request.url.path
        ).model_dump(mode='json')
    )


async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Handle validation errors"""
    errors = [{"field": ".".join(str(x) for x in err["loc"]), "message": err["msg"]} 
              for err in exc.errors()]
    
    return JSONResponse(
        status_code=422,
        content=ErrorResponse(
            success=False,
            message="Validation failed",
            timestamp=datetime.utcnow(),
            error=ErrorDetail(code="VALIDATION_ERROR", message="Validation failed", details={"errors": errors}),
            path=request.url.path
        ).model_dump(mode='json')
    )


async def generic_exception_handler(request: Request, exc: Exception):
    """Handle all other exceptions"""
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    await log_error_to_db(request, exc)
    
    return JSONResponse(
        status_code=500,
        content=ErrorResponse(
            success=False,
            message="Internal server error",
            timestamp=datetime.utcnow(),
            error=ErrorDetail(code="INTERNAL_ERROR", message=str(exc)),
            path=request.url.path
        ).model_dump(mode='json')
    )


def setup_exception_handlers(app: FastAPI):
    """Setup all exception handlers"""
    app.add_exception_handler(AIHubException, aihub_exception_handler)
    app.add_exception_handler(RequestValidationError, validation_exception_handler)
    app.add_exception_handler(Exception, generic_exception_handler)
