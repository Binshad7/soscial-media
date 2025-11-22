"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSuccess = exports.loginSuccess = exports.authSuccess = exports.errorResponse = exports.paginated = exports.noContent = exports.created = exports.operationSuccess = exports.success = void 0;
const StatusCodes_1 = require("../../constants/StatusCodes");
const constants_1 = require("../../constants");
const success = (res, data, message, statusCode = StatusCodes_1.HTTP_STATUS.OK) => {
    const response = {
        data,
        message
    };
    return res.status(statusCode).json({ success: true, response });
};
exports.success = success;
const operationSuccess = (res) => {
};
exports.operationSuccess = operationSuccess;
const created = (res, data, message) => {
    return (0, exports.success)(res, data, message, StatusCodes_1.HTTP_STATUS.CREATED);
};
exports.created = created;
const noContent = (res) => {
    return res.status(StatusCodes_1.HTTP_STATUS.NO_CONTENT).send();
};
exports.noContent = noContent;
const paginated = (res, data, page, limit, total, message) => {
    const totalPages = Math.ceil(total / limit);
    const response = {
        data,
        meta: {
            page,
            limit,
            total,
            totalPages
        },
        ...(message && { message })
    };
    return res.status(StatusCodes_1.HTTP_STATUS.OK).json(response);
};
exports.paginated = paginated;
// error handling
const errorResponse = (res, message, statusCode) => {
    return res.status(statusCode).json({ success: false, error: message });
};
exports.errorResponse = errorResponse;
// Auth-specific responses
const authSuccess = (res, data, message = constants_1.COMMON_MESSAGE.SUCCESS) => {
    return (0, exports.success)(res, data, message);
};
exports.authSuccess = authSuccess;
const loginSuccess = (res, user) => {
    return (0, exports.authSuccess)(res, {
        user: {
            username: user.username,
            email: user.email
        }
    }, constants_1.USER_MESSAGE.LOGIN.SUCCESS);
};
exports.loginSuccess = loginSuccess;
const registerSuccess = (res, user) => {
    return (0, exports.created)(res, {
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }
    }, constants_1.USER_MESSAGE.REGISTER.REGISTRATION_SUCCESS);
};
exports.registerSuccess = registerSuccess;
