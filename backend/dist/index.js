"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const database_1 = require("./config/database"); // db connection
const redis_Client_1 = require("./infrastructure/services/redis/redis.Client"); // redis client connection
const userRoutes_1 = __importDefault(require("./presentation/routes/userRoutes"));
const chatRoutes_1 = __importDefault(require("./presentation/routes/chatRoutes"));
const groupRoutes_1 = __importDefault(require("./presentation/routes/groupRoutes"));
const videoCallRoutes_1 = __importDefault(require("./presentation/routes/videoCallRoutes"));
const authMiddleware_1 = require("./presentation/middlewares/authMiddleware");
const errorHandler_1 = require("./presentation/middlewares/errorHandler");
const env_vars_1 = require("./config/env_vars"); // env var
const app = (0, express_1.default)();
// cors
const corsOptions = {
    origin: env_vars_1.ENV.FRONTENT_URL,
    credentials: true,
    optionsSuccessStatus: 200
};
app.use((0, cookie_parser_1.default)()); // to access data from cookie and session like exmple of data jsonweb accessing from cookie  // It makes cookies available in req.cookies.
app.use((0, cors_1.default)(corsOptions)); // to give permison to external End Points
app.use(express_1.default.json()); // 
app.use(express_1.default.urlencoded({ extended: true })); // 
app.use((0, morgan_1.default)('dev')); // to debug routes
app.use("/api/v1/users", userRoutes_1.default);
app.use("/api/v1/users/chats", authMiddleware_1.authMiddleware, chatRoutes_1.default);
app.use("/api/v1/users/groups", authMiddleware_1.authMiddleware, groupRoutes_1.default);
app.use("/api/v1/users/videocalls", authMiddleware_1.authMiddleware, videoCallRoutes_1.default);
app.use(errorHandler_1.errorHandler);
app.listen(env_vars_1.ENV.PORT, () => {
    (0, database_1.connectDB)();
    (0, redis_Client_1.connectRedis)();
    console.log('server is running');
});
