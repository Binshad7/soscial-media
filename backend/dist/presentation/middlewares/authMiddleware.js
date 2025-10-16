"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const userMessages_1 = require("../../constants/messages/userMessages");
const StatusCodes_1 = require("../../constants/StatusCodes");
const cookieVariable_1 = require("../../constants/cookieVariable");
const jsonWebTokenVerify_1 = require("../helpers/jsonWebTokenVerify");
const jwtToken_1 = require("../../application/helpers/jwtToken");
const cookieHelper_1 = require("../helpers/cookieHelper");
const sessionStore_1 = require("../../infrastructure/services/redis/sessionStore");
const AppError_1 = require("../../domain/errors/AppError");
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies[cookieVariable_1.COOKIE_VAR.ACCESS_TOKEN];
        if (token) {
            const decoded = await (0, jsonWebTokenVerify_1.verifyToken)(token);
            const redisKey = decoded.redisKey;
            const userSession = await (0, sessionStore_1.getUserSession)(redisKey);
            if (!userSession)
                throw new AppError_1.AppError(userMessages_1.USER_MESSAGE.SESSION_EXPIRED, StatusCodes_1.HTTP_STATUS.UNAUTHORIZED);
            req.user = userSession;
            return next();
        }
        const refreshToken = req.cookies[cookieVariable_1.COOKIE_VAR.REFRESH_TOKEN];
        if (refreshToken) {
            const decoded = await (0, jsonWebTokenVerify_1.verifyToken)(refreshToken);
            const redisKey = decoded.redisKey;
            const userSession = await (0, sessionStore_1.getUserSession)(redisKey);
            if (!userSession)
                throw new AppError_1.AppError(userMessages_1.USER_MESSAGE.SESSION_EXPIRED, StatusCodes_1.HTTP_STATUS.UNAUTHORIZED);
            const newAccessToken = (0, jwtToken_1.generateJwtToken)(redisKey);
            (0, cookieHelper_1.setAuthCookie)(res, 'accessToken', newAccessToken, cookieVariable_1.COOKIE_VAR.ACCESS_TOKEN_EXPIRE);
            req.user = userSession;
            return next();
        }
        throw new AppError_1.AppError(userMessages_1.USER_MESSAGE.SESSION_EXPIRED, StatusCodes_1.HTTP_STATUS.UNAUTHORIZED);
    }
    catch (error) {
        next(error);
    }
};
exports.authMiddleware = authMiddleware;
