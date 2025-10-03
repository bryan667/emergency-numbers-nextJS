import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(`mongodb+srv://${process.env.MONGODB_KEY}emergency-numbers`);
  isConnected = true;
  console.log("✅ MongoDB connected");
}