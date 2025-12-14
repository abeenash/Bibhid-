import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;

if (!uri) {
    throw new Error("Mongo_URI is missing in .env");
}

export const client = new MongoClient(uri);