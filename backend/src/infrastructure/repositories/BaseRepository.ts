import { AppError } from "../../domain/error/AppError";
import { logger } from "../../shared/utils/loger";
import { InternalServerError, Conflict } from "../../shared/helpers/errors";

export abstract class BaseRepository {
  protected async execute<T>(operation: () => Promise<T>): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      this.logError(error);
      throw this.transformError(error);
    }
  }

  private logError(error: any): void {
    logger.error('Repository operation failed', {
      error: error.message,
      stack: error.stack
    });
  }

  private transformError(error: any): AppError {
    if (error.code === 11000) {   // Handle MongoDB duplicate key error
      const field = Object.keys(error.keyPattern)[0];
      return Conflict(`${field} already exists`);
    }


    if (error.name === 'ValidationError') {// Handle MongoDB validation errors
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return new AppError(`Validation failed: ${messages.join(', ')}`, 400);
    }


    if (error.name === 'CastError') {  // Handle MongoDB cast errors
      return new AppError(`Invalid ${error.path}: ${error.value}`, 400);
    }

    // Default to internal server error
    return InternalServerError('Database operation failed');
  }
}
