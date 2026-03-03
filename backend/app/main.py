from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import chat_routes, wardrobe_routes, profile_routes, auth_routes

app = FastAPI(title="AI Outfit Planner API")

@app.get("/")
def health():
    return {
        "status": "API is running",
        "routes": {
            "/profile/create": "POST - Create or update user profile",
            "/profile/{user_id}": "GET - Get user profile",
            "/profile/{user_id}": "PUT - Update user profile",
            "/wardrobe/add": "POST - Add an item to the user's wardrobe",
            "/wardrobe/{user_id}": "GET - Get all wardrobe items for a user",
            "/wardrobe/{item_id}": "DELETE - Delete a wardrobe item",
            "/chat": "POST - Get outfit recommendation based on user profile and wardrobe",
        }
    }

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_routes.router)
app.include_router(profile_routes.router)
app.include_router(wardrobe_routes.router)
app.include_router(chat_routes.router)
