import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    category: mongoose.Schema.Types.ObjectId;
    brand: string;
    stock: number;
    image?: string;
}

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    // category: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    brand: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    image: { type: String, default: "" }
}, {
    timestamps: true
});

const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;