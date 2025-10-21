import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

import { connectDB } from './infrastructure/db/mongoose/connectDB';  // db connection
import { connectRedis } from './infrastructure/services/redis/redis.Client'; // redis client connection

import userRoutes from "./presentation/routes/userRoutes";
import chatRoutes from "./presentation/routes/chatRoutes";
import groupRoutes from "./presentation/routes/groupRoutes";
import videoCallRoutes from "./presentation/routes/videoCallRoutes";
import { authMiddleware } from "./presentation/middlewares/authMiddleware";
import { errorHandler } from "./presentation/middlewares/errorHandler";

// Security and utility middleware
import { securityHeaders, mongoSanitization, requestSizeLimiter, xssProtection } from "./presentation/middlewares/security";
import { requestId } from "./presentation/middlewares/requestId";
import { generalLimiter } from "./presentation/middlewares/rateLimiter";

import { ENV } from './config/env_vars' // env var
import { logger } from './shared/helpers/loger';

const app = express();

// cors
const allowedOrigins = (ENV.FRONTEND_ORIGINS ?? ENV.FRONTEND_URL ?? "")
    .split(",")
    .map(o => o.trim())
    .filter(Boolean);

const corsOptions = {
    origin: (origin: any, callback: any) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200
}

// Security middleware (order matters!)
app.use(securityHeaders);
app.use(mongoSanitization);
app.use(xssProtection);
app.use(requestSizeLimiter);
app.use(requestId);

// CORS and parsing middleware
app.use(cors(corsOptions));
app.use(cookieParser()); // to access data from cookie and session
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ extended: true, limit: '10mb' })); 

// Logging
app.use(morgan('combined', {
  stream: {
    write: (message: string) => logger.info(message.trim())
  }
}));

// Rate limiting
app.use(generalLimiter);



app.use("/api/v1/users", userRoutes);
app.use("/api/v1/users/chats", authMiddleware, chatRoutes);
app.use("/api/v1/users/groups", authMiddleware, groupRoutes);
app.use("/api/v1/users/videocalls", authMiddleware, videoCallRoutes);

app.use(errorHandler);
app.listen(ENV.PORT, () => {
    connectDB();
    connectRedis()
    logger.info("server running success fully")
})