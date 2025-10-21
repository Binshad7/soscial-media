import { AppError } from "../../domain/errors/AppError";
import { HTTP_STATUS } from "../../constants/StatusCodes";
import { COMMON_MESSAGE, USER_MESSAGE } from "../../constants/messages/ResponseMessages";
export const BadRequest = (message: string) => new AppError(message, HTTP_STATUS.BAD_REQUEST);
export const Unauthorized = (message?: string) => new AppError(message || USER_MESSAGE.LOGIN.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
export const Forbidden = (message?: string) => new AppError(message || USER_MESSAGE.LOGIN.FORBIDDEN, HTTP_STATUS.FORBIDDEN);
export const NotFound = (message?: string) => new AppError(message || USER_MESSAGE.PROFILE.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
export const Conflict = (message: string) => new AppError(message, HTTP_STATUS.CONFLICT);
export const UnprocessableEntity = (message: string) => new AppError(message, HTTP_STATUS.UNPROCESSABLE_ENTITY);
export const TooManyRequests = (message: string) => new AppError(message, HTTP_STATUS.TOO_MANY_REQUESTS);
export const InternalServerError = (message?: string) => new AppError(message || COMMON_MESSAGE.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);

// Common validation errors
export const ValidationError = (field: string, message: string) =>
  BadRequest(`Validation error for ${field}: ${message}`);

// Common auth errors
export const InvalidCredentials = () => Unauthorized(USER_MESSAGE.LOGIN.INVALID_CREDENTIALS);
export const TokenExpired = () => Unauthorized();
export const TokenInvalid = () => Unauthorized("Invalid token");
export const SessionExpired = () => Unauthorized("Session has expired");

// Common business logic errors
export const UserNotFound = (id?: string) => NotFound(id ? `User with ID ${id} not found` : "User not found");
export const EmailAlreadyExists = () => Conflict("Email already exists");
export const UsernameAlreadyExists = () => Conflict("Username already exists");
export const CannotFollowSelf = () => BadRequest("Cannot send follow request to yourself");
export const AlreadyFollowing = () => Conflict(USER_MESSAGE.REGISTER.USER_ALREADY_EXISTS);
export const FollowRequestAlreadySent = () => Conflict("Follow request already sent");
export const FollowRequestNotFound = () => NotFound("Follow request not found");

// Rate limiting errors
export const RateLimitExceeded = (retryAfter?: number) => {
  const error = TooManyRequests("Too many requests, please try again later");
  if (retryAfter) {
    error.retryAfter = retryAfter;
  }
  return error;
};
