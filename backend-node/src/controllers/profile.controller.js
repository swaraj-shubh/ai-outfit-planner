import User from "../models/User.js";

export const getMyProfile = async (req, res) => {
  try {
    const user = req.user;

    res.json(user);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMyProfile = async (req, res) => {
  try {

    await User.updateOne(
      { _id: req.user._id },
      { $set: req.body }
    );

    res.json({ message: "Profile updated successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};