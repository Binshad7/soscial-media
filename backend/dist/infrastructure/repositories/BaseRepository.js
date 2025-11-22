"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const AppError_1 = require("../../domain/Exceptions/AppError");
const loger_1 = require("../../shared/helpers/loger");
const errors_1 = require("../../shared/helpers/errors");
class BaseRepository {
    async execute(operation) {
        try {
            return await operation();
        }
        catch (error) {
            this.logError(error);
            throw this.transformError(error);
        }
    }
    logError(error) {
        loger_1.logger.error('Repository operation failed', {
            error: error.message,
            stack: error.stack
        });
    }
    transformError(error) {
        if (error.code === 11000) { // Handle MongoDB duplicate key error
            const field = Object.keys(error.keyPattern)[0];
            return (0, errors_1.Conflict)(`${field} already exists`);
        }
        if (error.name === 'ValidationError') { // Handle MongoDB validation errors
            const messages = Object.values(error.errors).map((err) => err.message);
            return new AppError_1.AppError(`Validation failed: ${messages.join(', ')}`, 400);
        }
        if (error.name === 'CastError') { // Handle MongoDB cast errors
            return new AppError_1.AppError(`Invalid ${error.path}: ${error.value}`, 400);
        }
        // Default to internal server error
        return (0, errors_1.InternalServerError)('Database operation failed');
    }
}
exports.BaseRepository = BaseRepository;
