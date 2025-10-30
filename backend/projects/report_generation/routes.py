"""
Report Generation Routes (Placeholder)
"""
from fastapi import APIRouter, Depends
from core.dependencies import get_current_user
from shared.schemas.base import DataResponse

router = APIRouter()


@router.post("/generate")
async def generate_report(user = Depends(get_current_user)):
    """Generate report (Coming soon)"""
    return DataResponse(
        data={"status": "coming_soon"},
        message="Report generation feature coming soon"
    )


@router.get("/templates")
async def list_templates(user = Depends(get_current_user)):
    """List available report templates"""
    return DataResponse(
        data={"templates": []},
        message="Report templates"
    )
