from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from app.services.ai_service import generate_outfit_response
from app.routes.auth_routes import get_current_user

router = APIRouter(prefix="/chat", tags=["Chat"])


class ChatRequest(BaseModel):
    message: str


@router.post("/")
async def chat_with_ai(
    request: ChatRequest,
    current_user: dict = Depends(get_current_user)
):
    try:
        user_id = str(current_user["_id"])  # 🔥 Take from token
        response = generate_outfit_response(user_id, request.message)
        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    