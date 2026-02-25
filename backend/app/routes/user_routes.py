from fastapi import APIRouter
from pydantic import BaseModel
from app.database import users_collection

router = APIRouter(prefix="/users", tags=["Users"])

class UserProfile(BaseModel):
    name: str
    gender: str
    body_type: str
    skin_tone: str
    style: str
    location: str

@router.post("/create")
def create_user(profile: UserProfile):
    user = profile.dict()
    result = users_collection.insert_one(user)
    return {"user_id": str(result.inserted_id)}