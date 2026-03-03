from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
from typing import List, Optional
from app.database import users_collection
from app.routes.auth_routes import get_current_user

router = APIRouter(prefix="/profile", tags=["Profile"])


class UserProfile(BaseModel):
    name: str = Field(..., min_length=2)
    age: int = Field(..., ge=13, le=100)
    gender: str
    location: str
    profession: Optional[str] = None

    height_cm: Optional[int] = None
    weight_kg: Optional[int] = None
    body_type: Optional[str] = None
    skin_tone: Optional[str] = None
    fit_preference: Optional[str] = None

    style_preferences: List[str] = Field(default_factory=list)
    comfort_level: Optional[str] = None
    budget_range: Optional[str] = None
    favorite_colors: List[str] = Field(default_factory=list)
    disliked_colors: List[str] = Field(default_factory=list)


# 🔹 GET MY PROFILE
@router.get("/me")
def get_my_profile(current_user: dict = Depends(get_current_user)):

    user = current_user.copy()
    user["_id"] = str(user["_id"])
    user.pop("password", None)  # 🔥 never return password

    return user


# 🔹 UPDATE MY PROFILE
@router.put("/me")
def update_my_profile(
    profile: UserProfile,
    current_user: dict = Depends(get_current_user)
):

    users_collection.update_one(
        {"_id": current_user["_id"]},
        {"$set": profile.dict()}
    )

    return {"message": "Profile updated successfully"}