import express from "express";
import {
    createCategory,
    getCategories,
    deleteCategory
} from "../controllers/category.controller.js";

import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/", protect, admin, createCategory);
router.delete("/:id", protect, admin, deleteCategory);

export default router;