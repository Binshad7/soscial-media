"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followRequestLimiter = exports.passwordResetLimiter = exports.authLimiter = exports.generalLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const loger_1 = require("../../shared/helpers/loger");
exports.generalLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        loger_1.logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
        res.status(429).json({
            success: false,
            message: 'Too many requests from this IP, please try again later.'
        });
    }
});
// Strict rate limiter for auth endpoints
exports.authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        success: false,
        message: 'Too many authentication attempts, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true, // Don't count successful requests withc means it not count  200 and 300 status messages
    handler: (req, res) => {
        loger_1.logger.warn(`Auth rate limit exceeded for IP: ${req.ip}, Path: ${req.path}`);
        res.status(429).json({
            success: false,
            message: 'Too many authentication attempts, please try again later.'
        });
    }
});
// Password reset rate limiter
exports.passwordResetLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 60 * 1000,
    max: 3,
    message: {
        success: false,
        message: 'Too many password reset attempts, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        loger_1.logger.warn(`Password reset rate limit exceeded for IP: ${req.ip}`);
        res.status(429).json({
            success: false,
            message: 'Too many password reset attempts, please try again later.'
        });
    }
});
// Follow request rate limiter
exports.followRequestLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000,
    max: 10,
    message: {
        success: false,
        message: 'Too many follow requests, please slow down.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        loger_1.logger.warn(`Follow request rate limit exceeded for IP: ${req.ip}`);
        res.status(429).json({
            success: false,
            message: 'Too many follow requests, please slow down.'
        });
    }
});
// const demoHandle = rateLimit({
//   windowMs: 30 * 60 * 1000,
//   max: 10,
//   message: {
//     success: false,
//     message: "poda ith demo anu"
//   },
//   standardHeaders: true,
//   legacyHeaders: false,
//   skipSuccessfulRequests: true,
//   skipFailedRequests: false,
//   handler: (req: Request, res: Response) => {
//     res.status(488).send()
//   }
// })
