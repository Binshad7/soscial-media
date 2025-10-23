import { Request, Response, NextFunction } from "express";
import { AppError } from "../../domain/errors/AppError";
import { COMMON_MESSAGE } from "../../constants/messages/ResponseMessages";
import { HTTP_STATUS } from "../../constants/StatusCodes";
import { logger } from "../../shared/helpers/loger";
export const errorHandler = (
    err: Error,
    req: Request,
    res: Response
) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            error: err.message
        });
    }

    logger.error("Unhandled error:", err);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: COMMON_MESSAGE.SERVER_ERROR });
};
