import mongoose from "mongoose";
import { ENV } from './env_vars'
export const connectDB = async () => {
    try {
        await mongoose.connect(ENV.MONGO_URL);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};