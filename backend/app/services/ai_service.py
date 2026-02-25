import json
import re
from bson import ObjectId
from google import genai
from app.config import GEMINI_API_KEY
from app.services.prompt_builder import build_prompt
from app.utils.json_parser import parse_ai_json
from app.database import users_collection, wardrobe_collection

client = genai.Client(api_key=GEMINI_API_KEY)


def generate_outfit_response(user_id: str, message: str):

    user = users_collection.find_one({"_id": ObjectId(user_id)})
    wardrobe_items = wardrobe_collection.find({"user_id": user_id})

    wardrobe = [item["item"] for item in wardrobe_items]

    profile = {
        "gender": user["gender"] or "male",
        "body_type": user["body_type"] or "fit",
        "style": user["style"] or "casual",
        "location": user["location"] or "India"
    }
    # wardrobe = [
    #     "Black formal shirt (slim)",
    #     "White casual shirt",
    #     "Navy blazer",
    #     "Dark blue slim jeans",
    #     "Charcoal tailored trousers",
    #     "White sneakers",
    #     "Brown loafers",
    #     "Silver minimal watch"
    # ]

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

        raw_text = response.text

        parsed_json = parse_ai_json(raw_text)

        return parsed_json

    except Exception as e:
        return {
            "error": "AI generation failed",
            "details": str(e)
        }