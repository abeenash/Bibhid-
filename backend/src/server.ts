import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import passport from "passport";
import "./auth/google.strategy.js"
import authRoutes from "./routes/auth.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use("/auth", authRoutes);
// app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req: any, res: any) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
