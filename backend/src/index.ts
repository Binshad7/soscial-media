import express from 'express';
import dotenv from "dotenv";

import { connectDB } from "./config/database";  // db connection

import userRoutes from "./presentation/routes/userRoutes";
import chatRoutes from "./presentation/routes/chatRoutes";
import groupRoutes from "./presentation/routes/groupRoutes";
import videoCallRoutes from "./presentation/routes/videoCallRoutes";
import { authMiddleware } from "./presentation/middlewares/authMiddleware";
import { errorHandler } from "./presentation/middlewares/errorHandler";

import { ENV } from './config/env_vars' // env var
const app = express();

dotenv.config();
app.use(express.json());

connectDB();

app.use(authMiddleware);

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/chats", chatRoutes);
app.use("/api/v1/groups", groupRoutes);
app.use("/api/v1/videocalls", videoCallRoutes);

app.use(errorHandler);
app.listen(ENV.PORT, () => {
    console.log('server is running')
})