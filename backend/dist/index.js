"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const connectDB_1 = require("./infrastructure/db/mongoose/connectDB"); // db connection   
const redis_Client_1 = require("./infrastructure/services/redis/redis.Client"); // redis client connection
const userRoutes_1 = __importDefault(require("./presentation/routes/userRoutes"));
const chatRoutes_1 = __importDefault(require("./presentation/routes/chatRoutes"));
const groupRoutes_1 = __importDefault(require("./presentation/routes/groupRoutes"));
const videoCallRoutes_1 = __importDefault(require("./presentation/routes/videoCallRoutes"));
// AuthMiddleware
const authMiddleware_1 = require("./presentation/middlewares/authMiddleware");
// ErrorHandler middleware
const errorHandler_1 = require("./presentation/middlewares/errorHandler");
// Security and utility middleware
const security_1 = require("./presentation/middlewares/security");
const requestId_1 = require("./presentation/middlewares/requestId");
const rateLimiter_1 = require("./presentation/middlewares/rateLimiter");
const env_vars_1 = require("./config/env_vars"); // env var
const loger_1 = require("./shared/helpers/loger");
const app = (0, express_1.default)();
// Cors
const allowedOrigins = (env_vars_1.ENV.FRONTEND_ORIGINS ?? env_vars_1.ENV.FRONTEND_URL ?? "")
    .split(",")
    .map(o => o.trim())
    .filter(Boolean);
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin))
            return callback(null, true);
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200
};
// app.set('trust proxy', true); for production to get actual ip adress
// Security middleware (order matters!)
app.use(security_1.securityHeaders);
app.use(security_1.mongoSanitization);
app.use(security_1.xssProtection);
app.use(security_1.requestSizeLimiter);
app.use(requestId_1.requestId);
// CORS and parsing middleware
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)()); // to access data from cookie and session
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// Logging
app.use((0, morgan_1.default)('combined', {
    stream: {
        write: (message) => loger_1.logger.info(message.trim())
    }
}));
// Rate limiting
app.use(rateLimiter_1.generalLimiter);
app.use("/api/v1/users", userRoutes_1.default);
app.use("/api/v1/users/chats", authMiddleware_1.authMiddleware, chatRoutes_1.default);
app.use("/api/v1/users/groups", authMiddleware_1.authMiddleware, groupRoutes_1.default);
app.use("/api/v1/users/videocalls", authMiddleware_1.authMiddleware, videoCallRoutes_1.default);
app.use(errorHandler_1.errorHandler);
app.listen(env_vars_1.ENV.PORT, () => {
    (0, connectDB_1.connectDB)();
    (0, redis_Client_1.connectRedis)();
    loger_1.logger.info("server running success fully");
});
