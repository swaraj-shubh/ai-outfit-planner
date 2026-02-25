from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.ai_service import generate_outfit_response

router = APIRouter(prefix="/chat", tags=["Chat"])

class ChatRequest(BaseModel):
    user_id: str
    message: str

@router.post("/")
async def chat_with_ai(request: ChatRequest):
    try:
        response = generate_outfit_response(request.user_id, request.message)
        return response
    except Exception as e:
        print("ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))