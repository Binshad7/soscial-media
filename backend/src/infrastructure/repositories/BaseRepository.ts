import { AppError } from "../../domain/errors/AppError";
import { logger } from "../../shared/helpers/loger";
import { InternalServerError, Conflict } from "../../presentation/helpers/errors";

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
    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return Conflict(`${field} already exists`);
    }
    
    // Handle MongoDB validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return new AppError(`Validation failed: ${messages.join(', ')}`, 400);
    }
    
    // Handle MongoDB cast errors
    if (error.name === 'CastError') {
      return new AppError(`Invalid ${error.path}: ${error.value}`, 400);
    }
    
    // Default to internal server error
    return InternalServerError('Database operation failed');
  }
}
