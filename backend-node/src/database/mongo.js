import mongoose from "mongoose";
import { MONGO_URI, DATABASE_NAME } from "../config/config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(`${MONGO_URI}/${DATABASE_NAME}`);

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed", error);
    process.exit(1);
  }
};

export default connectDB;