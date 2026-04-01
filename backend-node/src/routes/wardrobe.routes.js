import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  addItem,
  getWardrobe,
  deleteItem
} from "../controllers/wardrobe.controller.js";

const router = express.Router();

router.post("/add", authMiddleware, addItem);

router.get("/me", authMiddleware, getWardrobe);

router.delete("/:item_id", authMiddleware, deleteItem);

export default router;