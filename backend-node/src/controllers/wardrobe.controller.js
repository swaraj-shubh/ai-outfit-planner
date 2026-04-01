import Wardrobe from "../models/Wardrobe.js";

export const addItem = async (req, res) => {
  try {
    const { category, name, color, style } = req.body;

    const item = await Wardrobe.create({
      user_id: req.user._id,
      category,
      name,
      color,
      style
    });

    res.json({
      message: `Item added: ${name}`,
      item_id: item._id
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};


export const getWardrobe = async (req, res) => {
  try {

    const items = await Wardrobe.find({
      user_id: req.user._id
    });

    const result = items.map(item => ({
      _id: item._id,
      user_id: item.user_id,
      category: item.category,
      name: item.name,
      color: item.color,
      style: item.style
    }));

    res.json({
      wardrobe: result
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};


export const deleteItem = async (req, res) => {
  try {

    const { item_id } = req.params;

    const result = await Wardrobe.deleteOne({
      _id: item_id,
      user_id: req.user._id
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Item not found"
      });
    }

    res.json({
      message: "Item deleted successfully"
    });

  } catch (error) {
    res.status(400).json({
      error: "Invalid item ID"
    });
  }
};