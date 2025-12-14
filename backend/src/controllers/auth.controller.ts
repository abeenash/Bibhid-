import { Request, Response } from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "Email already used" });

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashed,
            provider: "local",
        });

        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id.toString()),
        });
    } catch (err) {
        return res.status(500).json({ message: "Server Error" });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.findOne({ name, email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        if (!user.password) {
            return res.status(400).json({ message: "Please login with Google" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Invalid credentials" });

        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id.toString()),
        });
    }
    catch (err) {
        return res.status(500).json({ message: "Server Error" })
    }
};