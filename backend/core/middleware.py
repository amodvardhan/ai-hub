"""
Middleware Setup
"""
import time
import uuid
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from loguru import logger

from core.config import settings


class RequestLoggingMiddleware(BaseHTTPMiddleware):
    """Log all requests"""
    async def dispatch(self, request: Request, call_next):
        request_id = str(uuid.uuid4())
        request.state.request_id = request_id
        
        start_time = time.time()
        
        logger.info(f"📥 {request.method} {request.url.path}", request_id=request_id)
        
        response = await call_next(request)
        
        duration = time.time() - start_time
        logger.info(
            f"📤 {request.method} {request.url.path} - {response.status_code} ({duration:.3f}s)",
            request_id=request_id
        )
        
        response.headers["X-Request-ID"] = request_id
        return response


def setup_middleware(app: FastAPI):
    """Setup all middleware"""
    # CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # Request logging
    app.add_middleware(RequestLoggingMiddleware)
