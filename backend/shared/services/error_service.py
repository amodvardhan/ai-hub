"""Error Logging Service"""
from sqlalchemy.ext.asyncio import AsyncSession
from loguru import logger

from shared.models.error_log import ErrorLog


class ErrorService:
    @staticmethod
    async def log_error(
        error_code: str,
        message: str,
        severity: str,
        method: str,
        path: str,
        db: AsyncSession,
        user_id: int = None,
        stack_trace: str = None
    ) -> ErrorLog:
        """Log error to database"""
        error_log = ErrorLog(
            error_code=error_code,
            message=message,
            severity=severity,
            method=method,
            path=path,
            user_id=user_id,
            stack_trace=stack_trace
        )
        db.add(error_log)
        await db.commit()
        await db.refresh(error_log)
        
        logger.info(f"Error logged to database: {error_log.id}")
        return error_log
