"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_1 = require("../../domain/Exceptions/AppError");
const ResponseMessages_1 = require("../../constants/messages/ResponseMessages");
const StatusCodes_1 = require("../../constants/StatusCodes");
const loger_1 = require("../../shared/helpers/loger");
const response_1 = require("../helpers/response");
const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError_1.AppError) {
        return (0, response_1.errorResponse)(res, err.message, err.statusCode);
    }
    loger_1.logger.error("Unhandled error:", err);
    (0, response_1.errorResponse)(res, ResponseMessages_1.COMMON_MESSAGE.SERVER_ERROR, StatusCodes_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
};
exports.errorHandler = errorHandler;
