import mongoose from "mongoose";
import { ENV } from '../shared/config/env.config'
import { logger } from "../shared/utils/loger";
export const connectDB = async () => {
    try {
        await mongoose.connect(ENV.MONGO_URL);
        logger.info("MongoDB connected")
    } catch (error) {
        logger.error("MongoDB connection error:")
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};