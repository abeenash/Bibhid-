import express from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/product.controller.js";
import { protect, admin } from "../middleware/auth.js";
import Product from "../models/product.model.js";

const router = express.Router();

//public
router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/category/:categoryName", async (req, res) => {
    try {
        const categoryName = req.params.categoryName;
        const products = await Product.find({ category: categoryName as any });
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch" });
    }
});


//admin-only
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

export default router;