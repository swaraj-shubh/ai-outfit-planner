import json
import re

def parse_ai_json(raw_text: str) -> dict:
    """
    Enhanced parser to handle various AI response formats including truncated JSON,
    malformed JSON, and partial responses.
    """
    
    # Remove markdown if present
    clean_text = re.sub(r"```json|```", "", raw_text).strip()
    
    # Remove outer quotes if present
    if clean_text.startswith('"') and clean_text.endswith('"'):
        clean_text = clean_text[1:-1]
    
    # Fix escaped quotes
    clean_text = clean_text.replace('\\"', '"')
    
    # Try to extract JSON object from the text
    json_match = re.search(r'\{.*\}', clean_text, re.DOTALL)
    if json_match:
        clean_text = json_match.group()
    
    # First attempt: standard JSON parsing
    try:
        return json.loads(clean_text)
    except json.JSONDecodeError as e:
        # If standard parsing fails, try to repair the JSON
        return repair_json(clean_text, str(e))

def repair_json(clean_text: str, error_msg: str) -> dict:
    """
    Attempt to repair malformed JSON by:
    1. Handling truncated JSON (unterminated strings/objects)
    2. Fixing common JSON syntax issues
    3. Extracting partial data
    """
    
    # Default template for the required format
    default_template = {
        "w_top": "",
        "w_bottom": "",
        "w_footwear": "",
        "w_accessories": "",
        "u_top": "",
        "u_bottom": "",
        "u_footwear": "",
        "u_accessories": "",
        "tip": ""
    }
    
    # Try to fix unterminated string (the specific error in your example)
    if "Unterminated string" in error_msg:
        # Find the position where the string is unterminated
        match = re.search(r'line \d+ column \d+', error_msg)
        if match:
            # Add a closing quote to fix the unterminated string
            fixed_text = clean_text + '"'
            try:
                return json.loads(fixed_text + "}")
            except:
                pass
    
    # Extract key-value pairs using regex
    extracted_data = {}
    
    # Pattern to match key-value pairs (handles various formats)
    patterns = [
        # Pattern for quoted keys with quoted string values
        r'"([^"]+)"\s*:\s*"([^"]*)"',
        # Pattern for quoted keys with unquoted values
        r'"([^"]+)"\s*:\s*([^,\}\s]+)',
        # Pattern for unquoted keys
        r'([a-zA-Z_]+)\s*:\s*"([^"]*)"',
        r'([a-zA-Z_]+)\s*:\s*([^,\}\s]+)'
    ]
    
    for pattern in patterns:
        matches = re.findall(pattern, clean_text)
        for key, value in matches:
            # Clean up the key and value
            key = key.strip().strip('"\'')
            value = value.strip().strip('"\'')
            
            # Only add keys that match our expected format
            if key in default_template:
                extracted_data[key] = value
    
    # Also try to find tip separately (might be unquoted)
    tip_match = re.search(r'"tip"\s*:\s*"([^"]*)"', clean_text)
    if tip_match:
        extracted_data["tip"] = tip_match.group(1)
    
    # If we found any data, merge with template
    if extracted_data:
        result = default_template.copy()
        result.update(extracted_data)
        return result
    
    # If all else fails, return error with raw response
    return {"error": f"Invalid AI response format", "raw_response": clean_text}

# Alternative: More aggressive extraction method
def extract_json_from_ai_response(raw_text: str) -> dict:
    """
    Even more aggressive extraction - tries multiple strategies
    """
    
    # Strategy 1: Try to find complete JSON object
    json_pattern = r'\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}'
    json_match = re.search(json_pattern, raw_text, re.DOTALL)
    
    if json_match:
        potential_json = json_match.group()
        try:
            return json.loads(potential_json)
        except:
            pass
        
        # Strategy 2: Try to fix common issues
        try:
            # Fix missing quotes around keys
            fixed = re.sub(r'([{,])\s*([a-zA-Z_]+)\s*:', r'\1"\2":', potential_json)
            # Fix trailing commas
            fixed = re.sub(r',\s*}', '}', fixed)
            return json.loads(fixed)
        except:
            pass
    
    # Strategy 3: Extract key-value pairs line by line
    lines = raw_text.split('\n')
    extracted = {}
    
    for line in lines:
        # Look for patterns like "key": "value"
        match = re.search(r'"([^"]+)"\s*:\s*"([^"]*)"', line)
        if match:
            key, value = match.groups()
            extracted[key] = value
        else:
            # Look for patterns like key: "value"
            match = re.search(r'([a-zA-Z_]+)\s*:\s*"([^"]*)"', line)
            if match:
                key, value = match.groups()
                extracted[key] = value
    
    if extracted:
        return extracted
    
    return {"error": "Could not parse AI response", "raw_response": raw_text}