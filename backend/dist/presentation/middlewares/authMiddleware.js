"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const ResponseMessages_1 = require("../../constants/messages/ResponseMessages");
const StatusCodes_1 = require("../../constants/StatusCodes");
const cookieVariable_1 = require("../../constants/cookieVariable");
const jsonWebTokenVerify_1 = require("../helpers/jsonWebTokenVerify");
const cookieHelper_1 = require("../helpers/cookieHelper");
const sessionStore_1 = require("../../infrastructure/services/redis/sessionStore");
const AppError_1 = require("../../domain/errors/AppError");
const hashToken_1 = require("../../shared/helpers/hashToken");
const tokenCreateHelper_1 = require("../../application/helpers/tokenCreateHelper");
const loger_1 = require("../../shared/helpers/loger");
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies[cookieVariable_1.COOKIE_VAR.ACCESS_TOKEN];
        if (token) {
            try {
                const decoded = await (0, jsonWebTokenVerify_1.verifyToken)(token);
                const redisKey = decoded.redisKey;
                const userSession = await (0, sessionStore_1.getUserSession)(redisKey);
                if (!userSession)
                    return next(new AppError_1.AppError(ResponseMessages_1.USER_MESSAGE.LOGIN.UNAUTHORIZED, StatusCodes_1.HTTP_STATUS.UNAUTHORIZED));
                req.user = userSession.user;
                return next();
            }
            catch (error) {
                return next(new AppError_1.AppError(ResponseMessages_1.USER_MESSAGE.LOGIN.UNAUTHORIZED, StatusCodes_1.HTTP_STATUS.UNAUTHORIZED));
            }
        }
        const currRefreshToken = req.cookies[cookieVariable_1.COOKIE_VAR.REFRESH_TOKEN];
        if (currRefreshToken) {
            try {
                const decoded = await (0, jsonWebTokenVerify_1.verifyToken)(currRefreshToken);
                const decodedredisKey = decoded.redisKey;
                const userSession = await (0, sessionStore_1.getUserSession)(decodedredisKey);
                if (!userSession)
                    return next(new AppError_1.AppError(ResponseMessages_1.USER_MESSAGE.LOGIN.UNAUTHORIZED, StatusCodes_1.HTTP_STATUS.UNAUTHORIZED));
                const hashedRefreshToken = (0, hashToken_1.hashToken)(currRefreshToken);
                if (userSession.refreshToken !== hashedRefreshToken)
                    return next(new AppError_1.AppError(ResponseMessages_1.USER_MESSAGE.LOGIN.UNAUTHORIZED, StatusCodes_1.HTTP_STATUS.UNAUTHORIZED));
                const { accessToken, refreshToken, redisKey } = (0, tokenCreateHelper_1.createTokenPair)();
                await (0, sessionStore_1.deleteUserSession)(decodedredisKey);
                await (0, sessionStore_1.storeUserSession)(redisKey, userSession.user._id, refreshToken, userSession.user.username, userSession.user.email);
                (0, cookieHelper_1.setAuthCookie)(res, accessToken, refreshToken);
                req.user = userSession.user;
                return next();
            }
            catch (error) {
                loger_1.logger.error(error.message);
                return next(new AppError_1.AppError(ResponseMessages_1.USER_MESSAGE.LOGIN.UNAUTHORIZED, StatusCodes_1.HTTP_STATUS.UNAUTHORIZED));
            }
        }
        return next(new AppError_1.AppError(ResponseMessages_1.USER_MESSAGE.LOGIN.UNAUTHORIZED, StatusCodes_1.HTTP_STATUS.UNAUTHORIZED));
    }
    catch (error) {
        loger_1.logger.error(error.message);
        return next(error);
    }
};
exports.authMiddleware = authMiddleware;
