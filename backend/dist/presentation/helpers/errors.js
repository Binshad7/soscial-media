"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitExceeded = exports.AccepttFollowRequestFail = exports.FollowRequestAlreadySent = exports.AlreadyFollowing = exports.FollowRequestFaild = exports.CannotFollowSelf = exports.EmailAlreadyExists = exports.UserNotFound = exports.SessionExpired = exports.TokenInvalid = exports.TokenExpired = exports.InvalidCredentials = exports.ValidationError = exports.InternalServerError = exports.TooManyRequests = exports.UnprocessableEntity = exports.Conflict = exports.NotFound = exports.Forbidden = exports.Unauthorized = exports.BadRequest = void 0;
const AppError_1 = require("../../domain/errors/AppError");
const StatusCodes_1 = require("../../constants/StatusCodes");
const ResponseMessages_1 = require("../../constants/messages/ResponseMessages");
const BadRequest = (message) => new AppError_1.AppError(message, StatusCodes_1.HTTP_STATUS.BAD_REQUEST);
exports.BadRequest = BadRequest;
const Unauthorized = (message) => new AppError_1.AppError(message || ResponseMessages_1.USER_MESSAGE.LOGIN.UNAUTHORIZED, StatusCodes_1.HTTP_STATUS.UNAUTHORIZED);
exports.Unauthorized = Unauthorized;
const Forbidden = (message) => new AppError_1.AppError(message || ResponseMessages_1.USER_MESSAGE.LOGIN.FORBIDDEN, StatusCodes_1.HTTP_STATUS.FORBIDDEN);
exports.Forbidden = Forbidden;
const NotFound = (message) => new AppError_1.AppError(message || ResponseMessages_1.USER_MESSAGE.PROFILE.NOT_FOUND, StatusCodes_1.HTTP_STATUS.NOT_FOUND);
exports.NotFound = NotFound;
const Conflict = (message) => new AppError_1.AppError(message, StatusCodes_1.HTTP_STATUS.CONFLICT);
exports.Conflict = Conflict;
const UnprocessableEntity = (message) => new AppError_1.AppError(message, StatusCodes_1.HTTP_STATUS.UNPROCESSABLE_ENTITY);
exports.UnprocessableEntity = UnprocessableEntity;
const TooManyRequests = (message) => new AppError_1.AppError(message, StatusCodes_1.HTTP_STATUS.TOO_MANY_REQUESTS);
exports.TooManyRequests = TooManyRequests;
const InternalServerError = (message) => new AppError_1.AppError(message || ResponseMessages_1.COMMON_MESSAGE.SERVER_ERROR, StatusCodes_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
exports.InternalServerError = InternalServerError;
// Common validation errors
const ValidationError = (field, message) => (0, exports.BadRequest)(`Validation error for ${field}: ${message}`);
exports.ValidationError = ValidationError;
// Common auth errors
const InvalidCredentials = () => (0, exports.Unauthorized)(ResponseMessages_1.USER_MESSAGE.LOGIN.INVALID_CREDENTIALS);
exports.InvalidCredentials = InvalidCredentials;
const TokenExpired = () => (0, exports.Unauthorized)();
exports.TokenExpired = TokenExpired;
const TokenInvalid = () => (0, exports.Unauthorized)("Invalid token");
exports.TokenInvalid = TokenInvalid;
const SessionExpired = () => (0, exports.Unauthorized)("Session has expired");
exports.SessionExpired = SessionExpired;
// Common business logic errors
const UserNotFound = (id) => (0, exports.NotFound)(ResponseMessages_1.FOLLOW_MESSAGE.REQUEST.RECEIVER_NOT_FOUND);
exports.UserNotFound = UserNotFound;
const EmailAlreadyExists = () => (0, exports.Conflict)(ResponseMessages_1.USER_MESSAGE.REGISTER.USER_ALREADY_EXISTS);
exports.EmailAlreadyExists = EmailAlreadyExists;
const CannotFollowSelf = () => (0, exports.BadRequest)(ResponseMessages_1.FOLLOW_MESSAGE.REQUEST.SELF_FOLLOW);
exports.CannotFollowSelf = CannotFollowSelf;
const FollowRequestFaild = () => (0, exports.BadRequest)(ResponseMessages_1.FOLLOW_MESSAGE.REQUEST.SEND_FAILED);
exports.FollowRequestFaild = FollowRequestFaild;
const AlreadyFollowing = () => (0, exports.Conflict)(ResponseMessages_1.USER_MESSAGE.REGISTER.USER_ALREADY_EXISTS);
exports.AlreadyFollowing = AlreadyFollowing;
const FollowRequestAlreadySent = () => (0, exports.Conflict)(ResponseMessages_1.FOLLOW_MESSAGE.REQUEST.ALREADY_SENT);
exports.FollowRequestAlreadySent = FollowRequestAlreadySent;
const AccepttFollowRequestFail = () => (0, exports.BadRequest)(ResponseMessages_1.FOLLOW_MESSAGE.ACCEPT.FAILED);
exports.AccepttFollowRequestFail = AccepttFollowRequestFail;
// Rate limiting errors
const RateLimitExceeded = (retryAfter) => {
    const error = (0, exports.TooManyRequests)("Too many requests, please try again later");
    if (retryAfter) {
        error.retryAfter = retryAfter;
    }
    return error;
};
exports.RateLimitExceeded = RateLimitExceeded;
