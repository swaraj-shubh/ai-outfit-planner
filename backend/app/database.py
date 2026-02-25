from pymongo import MongoClient
from app.config import MONGO_URI, DATABASE_NAME

try:
    client = MongoClient(MONGO_URI)
    
    client.server_info()

    print("✅ MongoDB connected successfully!")

except Exception as e:
    print("❌ MongoDB connection failed:",MONGO_URI, e)

db = client[DATABASE_NAME]

users_collection = db["users"]
wardrobe_collection = db["wardrobe"]
chats_collection = db["chats"]