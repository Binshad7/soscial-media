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

interface AuthenticatedRequest extends Request {
  user?: UserSession
}

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies[COOKIE_VAR.ACCESS_TOKEN];
    if (token) {
      const decoded: any = await verifyToken(token);
      const redisKey = decoded.redisKey;

      const userSession = await getUserSession(redisKey);
      if (!userSession) throw new AppError(USER_MESSAGE.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);

      req.user = userSession.user;
      return next();
    }
    // if accessToken is expired 
    const refreshToken = req.cookies[COOKIE_VAR.REFRESH_TOKEN];
    if (refreshToken) {
      const decoded: any = await verifyToken(refreshToken);
      const redisKey = decoded.redisKey;

      const userSession = await getUserSession(redisKey);
      if (!userSession) throw new AppError(USER_MESSAGE.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
      if (userSession.refreshToken !== refreshToken) throw new AppError(USER_MESSAGE.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED)

      const newAccessToken = generateJwtToken(redisKey);
      setAuthCookie(res, COOKIE_VAR.ACCESS_TOKEN, newAccessToken, COOKIE_VAR.ACCESS_TOKEN_EXPIRE);

      req.user = userSession.user;
      return next();
    }
    throw new AppError(USER_MESSAGE.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
  } catch (error) {
    throw new AppError(COMMON_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};
