import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';





import { connectDB } from "./config/database";  // db connection

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
app.use(cors(corsOptions))
dotenv.config();
app.use(express.json());

connectDB();

app.use(authMiddleware);

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/users/chats", chatRoutes);
app.use("/api/v1/users/groups", groupRoutes);
app.use("/api/v1/users/videocalls", videoCallRoutes);

app.use(errorHandler);
app.listen(ENV.PORT, () => {
    console.log('server is running')
})