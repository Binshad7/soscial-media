"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
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
const rateLimiter_1 = require("./presentation/middlewares/rateLimiter");
const loger_1 = require("./shared/helpers/loger");
const app = (0, express_1.default)();
// app.set('trust proxy', true); for production to get actual ip adress
// CORS and parsing middleware
app.use((0, cors_1.default)(security_1.corsOptions));
// Security middleware (order matters!)
app.use(security_1.securityHeaders);
// app.use(mongoSanitization);
// // app.use(xssProtection);
app.use(security_1.requestSizeLimiter);
// app.use(requestId);
app.use((0, cookie_parser_1.default)()); // to access data from cookie and session
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// Logging
app.use((0, morgan_1.default)('dev', {
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
exports.default = app;
