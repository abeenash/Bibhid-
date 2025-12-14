import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    googleId?: string;
    provider: "local" | "google";
    role: "customer" | "admin";
}

const userSchema: Schema = new Schema({
    name: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    googleId: { type: String, required: false, unique: true, sparse: true },
    provider: { type: String, enum: ["local", "google"], default: "local" },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
},
    { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;