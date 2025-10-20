import mongoose from "mongoose";
import { ENV } from '../../../config/env_vars'
import { logger } from "../../../shared/helpers/loger";
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