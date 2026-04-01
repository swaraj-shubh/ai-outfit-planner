import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;

export const MONGO_URI = process.env.MONGO_URI;
export const DATABASE_NAME = process.env.DATABASE_NAME;

export const SECRET_KEY = process.env.SECRET_KEY;
export const JWT_EXPIRE = process.env.JWT_EXPIRE;

export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;