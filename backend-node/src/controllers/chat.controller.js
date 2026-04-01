import generateOutfitResponse from "../services/ai.service.js";
import Chat from "../models/Chat.js";

export const chatWithAI = async (req, res) => {
  try {

    const { message } = req.body;

    const user_id = req.user._id;

    const response = await generateOutfitResponse(user_id, message);

    // save chat history
    await Chat.create({
      user_id,
      message,
      ai_response: response
    });

    res.json(response);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};