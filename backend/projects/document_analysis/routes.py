from fastapi import APIRouter, Depends
from core.dependencies import get_current_user
from shared.schemas.base import DataResponse

router = APIRouter()

@router.post("/upload")
async def upload_document(user = Depends(get_current_user)):
    return DataResponse(data={"status": "uploaded"}, message="Document uploaded")
