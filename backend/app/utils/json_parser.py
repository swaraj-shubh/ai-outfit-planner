import json
import re

def parse_ai_json(raw_text: str) -> dict:
    """
    Cleans and converts AI raw text into proper JSON dict.
    """

    # Remove markdown if present
    clean_text = re.sub(r"```json|```", "", raw_text).strip()

    # Remove outer quotes if present
    if clean_text.startswith('"') and clean_text.endswith('"'):
        clean_text = clean_text[1:-1]

    # Fix escaped quotes
    clean_text = clean_text.replace('\\"', '"')

    return json.loads(clean_text)