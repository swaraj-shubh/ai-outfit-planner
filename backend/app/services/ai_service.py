from bson import ObjectId
from google import genai
from app.config import GEMINI_API_KEY
from app.services.prompt_builder import build_prompt
from app.utils.json_parser import parse_ai_json
from app.database import users_collection, wardrobe_collection

client = genai.Client(api_key=GEMINI_API_KEY)


def generate_outfit_response(user_id: str, message: str):

    # 🔹 Validate ObjectId
    try:
        object_id = ObjectId(user_id)
    except Exception:
        return {"error": "Invalid user ID format"}

    # 🔹 Fetch user
    user = users_collection.find_one({"_id": object_id})
    if not user:
        return {"error": "User not found"}

    # 🔹 Fetch wardrobe
    wardrobe_items = wardrobe_collection.find({"user_id": object_id})

    wardrobe = [
        {
            "category": item.get("category"),
            "name": item.get("name"),
            "color": item.get("color"),
            "style": item.get("style")
        }
        for item in wardrobe_items
    ]

    if not wardrobe:
        wardrobe = [{"category": "Shirt", "name": "Basic black shirt", "color": "Black", "style": "Casual"}]

    # 🔹 Safe profile mapping
    profile = {
        "gender": user.get("gender", "male"),
        "body_type": user.get("body_type", "fit"),
        "style": ", ".join(user.get("style_preferences", ["casual"])),
    }

    prompt = build_prompt(profile, wardrobe, message)

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config={
                "temperature": 0.3,
                "max_output_tokens": 1200
            }
        )

        parsed_json = parse_ai_json(response.text)
        return parsed_json

    except Exception as e:
        return {
            "error": "AI generation failed",
            "details": str(e)
        }