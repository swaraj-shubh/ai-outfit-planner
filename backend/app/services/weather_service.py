import json

def convert_to_json():
    # 1. Get the raw string input from the user
    print("Paste your string below and press Enter:")
    user_input = input().strip()

    try:
        # 2. Parse the string into a Python object
        # We use codecs or replace to handle escaped quotes if they are literal
        if '\\"' in user_input:
            user_input = user_input.replace('\\"', '"')
        
        # Strip leading/trailing outer quotes if the user pasted them
        if user_input.startswith('"') and user_input.endswith('"'):
            user_input = user_input[1:-1]

        data = json.loads(user_input)

        # 3. Convert the object back to a 'pretty' JSON string
        formatted_json = json.dumps(data, indent=4)
        
        print("\n--- Processed JSON Output ---")
        print(formatted_json)

    except json.JSONDecodeError as e:
        print(f"\nError: Could not parse JSON. {e}")

if __name__ == "__main__":
    convert_to_json()