import dotenv from "dotenv";
import mongoose, { Mongoose } from "mongoose";
dotenv.config();

// Optimized connection management (if needed)
let cachedDb: Mongoose | null = null;

export async function connectDb() {
  if (cachedDb) {
    return cachedDb; // Use existing connection if available
  }

  const url = process.env.MONGO_URI || "";
  const connection = await mongoose.connect(url);
  cachedDb = connection;

  console.log("Successfully connected to MongoDB");

  return connection;
}

