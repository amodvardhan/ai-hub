from pydantic import BaseModel

class ImageAnalysis(BaseModel):
    objects: list
