from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import chat_routes, user_routes, wardrobe_routes

app = FastAPI(title="AI Outfit Planner API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_routes.router)
app.include_router(user_routes.router)
app.include_router(wardrobe_routes.router)