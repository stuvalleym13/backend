import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
const CON_STR =
    process.env.CON_STR ;

export const connectDB = async () => {
  try {
    await mongoose.connect(CON_STR);
    console.log('✅ MongoDB Connected Successfully!');
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    process.exit(1); // Stop app if DB connection fails
  }
};

