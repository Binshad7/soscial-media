import { Request, Response, NextFunction } from "express";
import { USER_MESSAGE } from '../../constants/messages/userMessages';
import { HTTP_STATUS } from "../../constants/StatusCodes";
import { COOKIE_VAR } from "../../constants/cookieVariable";
import { verifyToken } from "../helpers/jsonWebTokenVerify";
import { generateJwtToken } from "../../application/helpers/jwtToken";
import { setAuthCookie } from "../helpers/cookieHelper";
import { getUserSession } from "../../infrastructure/services/redis/sessionStore";
import { AppError } from "../../domain/errors/AppError";
import { UserSession } from "../../infrastructure/services/redis/types/UserSession";
import { COMMON_MESSAGES } from "../../constants/messages/commonMessages";


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies[COOKIE_VAR.ACCESS_TOKEN];
    if (token) {
      try {
        const decoded: any = await verifyToken(token);
        const redisKey = decoded.redisKey;

        const userSession = await getUserSession(redisKey);
        if (!userSession) return next(new AppError(USER_MESSAGE.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED));
        req.user = userSession.user;
        return next();
      } catch (err: any) {
        // fall through to refresh flow only if token expired
      }
    }

    const refreshToken = req.cookies[COOKIE_VAR.REFRESH_TOKEN];
    if (refreshToken) {
      try {
        const decoded: any = await verifyToken(refreshToken);
        const redisKey = decoded.redisKey;
        
        const userSession = await getUserSession(redisKey);
        if (!userSession) return next(new AppError(USER_MESSAGE.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED));
        if (userSession.refreshToken !== refreshToken) return next(new AppError(USER_MESSAGE.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED));

        const newAccessToken = generateJwtToken(redisKey);
        setAuthCookie(res, COOKIE_VAR.ACCESS_TOKEN, newAccessToken, COOKIE_VAR.ACCESS_TOKEN_EXPIRE);
        req.user = userSession.user;
        return next();
      } catch (err: any) {
        return next(new AppError(USER_MESSAGE.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED));
      }
    }

    return next(new AppError(USER_MESSAGE.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED));
  } catch (error) {
    return next(error);
    }
};
