import { Response } from "express";
import { HTTP_STATUS } from "../../constants/StatusCodes";

interface ApiResponse<T = any> {
  message?: string;
  data?: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export const success = <T>(res: Response, data: T, message?: string, statusCode: number = HTTP_STATUS.OK) => {
  const response: ApiResponse<T> = {
    data,
    message 
  };
  return res.status(statusCode).json(response);
};

export const created = <T>(res: Response, data: T, message?: string) => {
  return success(res, data, message, HTTP_STATUS.CREATED);
};

export const noContent = (res: Response) => {
  return res.status(HTTP_STATUS.NO_CONTENT).send();
};

export const paginated = <T>(
  res: Response, 
  data: T[], 
  page: number, 
  limit: number, 
  total: number,
  message?: string
) => {
  const totalPages = Math.ceil(total / limit);
  const response: ApiResponse<T[]> = { 
    data,
    meta: {
      page,
      limit,
      total,
      totalPages
    },
    ...(message && { message })
  };
  return res.status(HTTP_STATUS.OK).json(response);
};

// Auth-specific responses
export const authSuccess = <T>(res: Response, data: T, message: string = "Authentication successful") => {
  return success(res, data, message);
};

export const loginSuccess = (res: Response, user: any, tokens: { accessToken: string; refreshToken: string }) => {
  return authSuccess(res, {
    user: {
      username: user.username,
      email: user.email,
      status: user.status
    },
    tokens
  }, "Login successful");
};

export const registerSuccess = (res: Response, user: any, tokens: { accessToken: string; refreshToken: string }) => {
  return created(res, {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      status: user.status
    },
    tokens
  }, "Registration successful");
};
