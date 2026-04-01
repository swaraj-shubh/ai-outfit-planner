import mongoose from "mongoose";

const WardrobeSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  category: String,
  name: String,
  color: String,
  style: String
});

export default mongoose.model("Wardrobe", WardrobeSchema);