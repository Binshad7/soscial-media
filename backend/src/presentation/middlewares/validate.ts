import { NextFunction, Request, Response } from "express";
import {  ZodSchema } from "zod";
import { AppError } from "../../domain/errors/AppError";
import { HTTP_STATUS } from "../../constants/StatusCodes";

export const validate = (schema: ZodSchema<any>, source: "body" | "query" | "params" = "body") =>
  (req: Request, _res: Response, next: NextFunction) => {
    const data = source === "body" ? req.body : source === "query" ? req.query : req.params;
    const result = schema.safeParse(data);
    
    if (!result.success) {
      const message = result.error.issues[0]?.message || "Validation error";
      return next(new AppError(message, HTTP_STATUS.BAD_REQUEST));
    }
    
    // Replace the original data with validated data
    if (source === "body") req.body = result.data;
    else if (source === "query") req.query = result.data;
    else req.params = result.data;
    
    next();
  };
