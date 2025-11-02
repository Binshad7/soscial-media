"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSuccess = exports.loginSuccess = exports.authSuccess = exports.paginated = exports.noContent = exports.created = exports.success = void 0;
const StatusCodes_1 = require("../../constants/StatusCodes");
const success = (res, data, message, statusCode = StatusCodes_1.HTTP_STATUS.OK) => {
    const response = {
        data,
        message
    };
    return res.status(statusCode).json(response);
};
exports.success = success;
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
// Auth-specific responses
const authSuccess = (res, data, message = "Authentication successful") => {
    return (0, exports.success)(res, data, message);
};
exports.authSuccess = authSuccess;
const loginSuccess = (res, user, tokens) => {
    return (0, exports.authSuccess)(res, {
        user: {
            username: user.username,
            email: user.email,
            status: user.status
        },
        tokens
    }, "Login successful");
};
exports.loginSuccess = loginSuccess;
const registerSuccess = (res, user, tokens) => {
    return (0, exports.created)(res, {
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            status: user.status
        },
        tokens
    }, "Registration successful");
};
exports.registerSuccess = registerSuccess;
