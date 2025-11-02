"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_1 = require("../../domain/errors/AppError");
const ResponseMessages_1 = require("../../constants/messages/ResponseMessages");
const StatusCodes_1 = require("../../constants/StatusCodes");
const loger_1 = require("../../shared/helpers/loger");
const errorHandler = (err, req, res) => {
    if (err instanceof AppError_1.AppError) {
        return res.status(err.statusCode).json({
            error: err.message
        });
    }
    loger_1.logger.error("Unhandled error:", err);
    res.status(StatusCodes_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: ResponseMessages_1.COMMON_MESSAGE.SERVER_ERROR });
};
exports.errorHandler = errorHandler;
