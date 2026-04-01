import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    message: {
      type: String,
      required: true
    },

    ai_response: {
      type: Object,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Chat", ChatSchema);