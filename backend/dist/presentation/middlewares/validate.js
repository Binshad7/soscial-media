"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const AppError_1 = require("../../domain/Exceptions/AppError");
const StatusCodes_1 = require("../../constants/StatusCodes");
const validate = (schema, source = "body") => (req, _res, next) => {
    const data = source === "body" ? req.body : source === "query" ? req.query : req.params;
    const result = schema.safeParse(data);
    if (!result.success) {
        const message = result.error.issues[0]?.message || "Validation error";
        return next(new AppError_1.AppError(message, StatusCodes_1.HTTP_STATUS.BAD_REQUEST));
    }
    // Replace the original data with validated data    
    if (source === "body")
        req.body = result.data;
    else if (source === "query")
        req.query = result.data;
    else
        req.params = result.data;
    next();
};
exports.validate = validate;
