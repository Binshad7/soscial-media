import { NextFunction, Request, Response } from "express";
import { AppError } from "../../domain/error/AppError";
import { COMMON_MESSAGE } from "../../constants/messages/ResponseMessages";
import { HTTP_STATUS } from "../../constants/StatusCodes";
import { logger } from "../../shared/utils/loger";
import { errorResponse } from "../helpers/response";
export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof AppError) {
        return errorResponse(res, err.message, err.statusCode)
    }
    logger.error("Unhandled error:", err);
    errorResponse(res, COMMON_MESSAGE.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
};
