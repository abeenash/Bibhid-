import { Request, Response } from "express";
import Product from "../models/product.model.js";

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err: any) {
        console.error("CREATE ERROR:", err.message);
        res.status(500).json({ error: err.message });
    }
};

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch products" });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Not found" });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch product" });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: "Failed to update product" });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product deleted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete product" });
    }
};
