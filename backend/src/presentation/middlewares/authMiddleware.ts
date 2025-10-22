import { Request, Response, NextFunction } from "express";
import { USER_MESSAGE } from '../../constants/messages/ResponseMessages';
import { HTTP_STATUS } from "../../constants/StatusCodes";
import { COOKIE_VAR } from "../../constants/cookieVariable";
import { verifyToken } from "../helpers/jsonWebTokenVerify";
import { setAuthCookie } from "../helpers/cookieHelper";
import { deleteUserSession, getUserSession, storeUserSession } from "../../infrastructure/services/redis/sessionStore";
import { AppError } from "../../domain/errors/AppError";
import { hashToken } from "../../shared/helpers/hashToken";
import { createTokenPair } from "../../application/helpers/tokenCreateHelper";
import { logger } from "../../shared/helpers/loger";


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies[COOKIE_VAR.ACCESS_TOKEN];
    if (token) {
      try {
        const decoded: any = await verifyToken(token);
        const redisKey = decoded.redisKey;

        const userSession = await getUserSession(redisKey);
        if (!userSession) return next(new AppError(USER_MESSAGE.LOGIN.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED));
        req.user = userSession.user;
        return next();
      } catch (error: any) {
        return next(new AppError(USER_MESSAGE.LOGIN.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED));
      }
    }

    const currRefreshToken = req.cookies[COOKIE_VAR.REFRESH_TOKEN];
    if (currRefreshToken) {
      try {
        const decoded: any = await verifyToken(currRefreshToken);
        const decodedredisKey = decoded.redisKey;

        const userSession = await getUserSession(decodedredisKey);
        if (!userSession) return next(new AppError(USER_MESSAGE.LOGIN.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED));
        const hashedRefreshToken = hashToken(currRefreshToken);
        if (userSession.refreshToken !== hashedRefreshToken) return next(new AppError(USER_MESSAGE.LOGIN.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED));

        const { accessToken, refreshToken, redisKey } = createTokenPair();
        await deleteUserSession(decodedredisKey)
        await storeUserSession(redisKey, userSession.user._id, refreshToken, userSession.user.username, userSession.user.email)
        setAuthCookie(res, accessToken, refreshToken)

        req.user = userSession.user;
        return next();
      } catch (error: any) {
        logger.error(error.message)
        return next(new AppError(USER_MESSAGE.LOGIN.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED));
      }
    }

    return next(new AppError(USER_MESSAGE.LOGIN.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED));
  } catch (error: any) {
    logger.error(error.message)
    return next(error);
  }
};
