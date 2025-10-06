import mongoose from 'mongoose';

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_KEY}emergency-numbers`,
    );
    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (e) {
    throw new Error('failed to connect mongoDB');
  }
}
