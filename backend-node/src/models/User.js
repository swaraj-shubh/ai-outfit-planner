import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,

    age: Number,
    gender: String,
    location: String,
    profession: String,

    height_cm: Number,
    weight_kg: Number,
    body_type: String,
    skin_tone: String,
    fit_preference: String,

    style_preferences: [String],
    comfort_level: String,
    budget_range: String,

    favorite_colors: [String],
    disliked_colors: [String]
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);