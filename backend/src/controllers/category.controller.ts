import { Request, Response } from "express";
import Category from "../models/category.model.js";

export const createCategory = async (req: Request, res: Response) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Category Deleted" });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};