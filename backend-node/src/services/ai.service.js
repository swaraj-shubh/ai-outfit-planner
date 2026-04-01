import { GoogleGenerativeAI } from "@google/generative-ai";

import { GEMINI_API_KEY } from "../config/config.js";
import User from "../models/User.js";
import Wardrobe from "../models/Wardrobe.js";

import buildPrompt from "./prompt.builder.js";
import parseAIJson from "../utils/jsonParser.js";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});

const generateOutfitResponse = async (user_id, message) => {

  try {

    const user = await User.findById(user_id);

    if (!user) {
      return { error: "User not found" };
    }

    const wardrobeItems = await Wardrobe.find({ user_id });

    let wardrobe = wardrobeItems.map(item => ({
      category: item.category,
      name: item.name,
      color: item.color,
      style: item.style
    }));

    if (!wardrobe.length) {

      wardrobe = [{
        category: "Shirt",
        name: "Basic black shirt",
        color: "Black",
        style: "Casual"
      }];
    }

    const profile = {
      gender: user.gender || "male",
      body_type: user.body_type || "fit",
      style: (user.style_preferences || ["casual"]).join(", ")
    };

    const prompt = buildPrompt(profile, wardrobe, message);

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    return parseAIJson(text);

  } catch (error) {

    return {
      error: "AI generation failed",
      details: error.message
    };
  }
};

export default generateOutfitResponse;