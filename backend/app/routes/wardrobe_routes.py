from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from bson import ObjectId
from app.database import wardrobe_collection
from app.routes.auth_routes import get_current_user

router = APIRouter(prefix="/wardrobe", tags=["Wardrobe"])


class WardrobeItem(BaseModel):
    category: str
    name: str
    color: str
    style: str


# 🔹 ADD ITEM (SECURE)
@router.post("/add")
def add_item(
    data: WardrobeItem,
    current_user: dict = Depends(get_current_user)
):

    user_id = current_user["_id"]

    item_data = data.dict()
    item_data["user_id"] = user_id

    result = wardrobe_collection.insert_one(item_data)

    return {
        "message": f"Item added: {data.name}",
        "item_id": str(result.inserted_id)
    }


# 🔹 GET MY WARDROBE (SECURE)
@router.get("/me")
def get_my_wardrobe(current_user: dict = Depends(get_current_user)):

    user_id = current_user["_id"]

    items = wardrobe_collection.find({"user_id": user_id})

    result = []
    for item in items:
        item["_id"] = str(item["_id"])
        item["user_id"] = str(item["user_id"])
        result.append(item)

    return {"wardrobe": result}


# 🔹 DELETE ITEM (ONLY IF OWNED)
@router.delete("/{item_id}")
def delete_item(
    item_id: str,
    current_user: dict = Depends(get_current_user)
):

    try:
        result = wardrobe_collection.delete_one({
            "_id": ObjectId(item_id),
            "user_id": current_user["_id"]  # 🔥 critical security check
        })

        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Item not found")

        return {"message": "Item deleted successfully"}

    except Exception:
        raise HTTPException(status_code=400, detail="Invalid item ID")