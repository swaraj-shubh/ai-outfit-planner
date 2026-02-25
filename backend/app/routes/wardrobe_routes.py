from fastapi import APIRouter
from pydantic import BaseModel
from app.database import wardrobe_collection

router = APIRouter(prefix="/wardrobe", tags=["Wardrobe"])

class WardrobeItem(BaseModel):
    user_id: str
    item: str

@router.post("/add")
def add_item(data: WardrobeItem):
    wardrobe_collection.insert_one(data.dict())
    return {"message": f"Item added: {data.item}"}