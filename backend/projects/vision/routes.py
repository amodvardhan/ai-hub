from fastapi import APIRouter, Depends
from core.dependencies import get_current_user
from shared.schemas.base import DataResponse

router = APIRouter()

@router.post("/analyze")
async def analyze_image(user = Depends(get_current_user)):
    return DataResponse(data={"objects": []}, message="Image analyzed")
