import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import cookiePareser from 'cookie-parser'
import morgan from 'morgan'

import { connectDB } from "./config/database";  // db connection
import { connectRedis } from './infrastructure/services/redis/redis.Client'; // redis client connection

import userRoutes from "./presentation/routes/userRoutes";
import chatRoutes from "./presentation/routes/chatRoutes";
import groupRoutes from "./presentation/routes/groupRoutes";
import videoCallRoutes from "./presentation/routes/videoCallRoutes";
import { authMiddleware } from "./presentation/middlewares/authMiddleware";
import { errorHandler } from "./presentation/middlewares/errorHandler";

import { ENV } from './config/env_vars' // env var

const app = express();

// cors
const corsOptions = {
    origin: ENV.FRONTENT_URL,
    credentials: true,
    optionsSuccessStatus: 200
}
app.use(cookiePareser()) // to access data from cookie and session like exmple of data jsonweb accessing from cookie  // It makes cookies available in req.cookies.
app.use(cors(corsOptions)) // to give permison to external End Points
app.use(express.json()); // 
app.use(express.urlencoded({ extended: true })); // 
app.use(morgan('dev')) // to debug routes



app.use("/api/v1/users", userRoutes);
app.use("/api/v1/users/chats", authMiddleware, chatRoutes);
app.use("/api/v1/users/groups", authMiddleware, groupRoutes);
app.use("/api/v1/users/videocalls", authMiddleware, videoCallRoutes);

app.use(errorHandler);
app.listen(ENV.PORT, () => {
    connectDB();
    connectRedis()
    console.log('server is running')
})