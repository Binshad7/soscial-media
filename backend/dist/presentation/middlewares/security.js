"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.xssProtection = exports.ipWhitelist = exports.requestSizeLimiter = exports.mongoSanitization = exports.securityHeaders = exports.corsOptions = exports.allowedOrigins = void 0;
const helmet_1 = __importDefault(require("helmet"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const loger_1 = require("../../shared/helpers/loger");
const env_vars_1 = require("../../config/env_vars");
exports.allowedOrigins = (env_vars_1.ENV.FRONTEND_ORIGINS ?? env_vars_1.ENV.FRONTEND_URL ?? "")
    .split(",")
    .map(o => o.trim())
    .filter(Boolean);
exports.corsOptions = {
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (exports.allowedOrigins.includes(origin))
            return callback(null, true);
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200
};
// Security headers middleware
exports.securityHeaders = (0, helmet_1.default)({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"], // only from our domain 
            styleSrc: ["'self'", "'unsafe-inline'"], // from our domain and inline css
            scriptSrc: ["'self'"], // js scipts 
            imgSrc: ["'self'", "data:", "https:"], // domain and inline and cdns
        },
    },
    crossOriginEmbedderPolicy: false, // Disable for  our API
    hsts: {
        maxAge: 31536000, //how long should be remember to use https
        includeSubDomains: true,
        preload: true // auto convention to http to https in browsers
    }
});
// MongoDB injection protection
exports.mongoSanitization = (0, express_mongo_sanitize_1.default)({
    replaceWith: '_', //it replace $ and . this symbol with _ this  ex email:{$ne:null}
    onSanitize: ({ req, key }) => {
        loger_1.logger.warn(`MongoDB injection attempt detected: ${key} in ${req.path}`);
    }
});
// Request size limiter
const requestSizeLimiter = (req, res, next) => {
    const contentLength = parseInt(req.get('content-length') || '0'); // to prevent 2gb req send that crash our server
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (contentLength > maxSize) {
        loger_1.logger.warn(`Request too large: ${contentLength} bytes from ${req.ip}`);
        return res.status(413).json({
            success: false,
            message: 'Request entity too large'
        });
    }
    next();
};
exports.requestSizeLimiter = requestSizeLimiter;
// IP whitelist middleware (optional)
const ipWhitelist = (allowedIPs) => {
    return (req, res, next) => {
        const clientIP = req.ip || req.connection.remoteAddress;
        if (allowedIPs.length > 0 && !allowedIPs.includes(clientIP || '')) {
            loger_1.logger.warn(`Unauthorized IP access attempt: ${clientIP}`);
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }
        next();
    };
};
exports.ipWhitelist = ipWhitelist;
// XSS protection middleware
const xssProtection = (req, res, next) => {
    const sanitizeInput = (obj) => {
        if (typeof obj === 'string') {
            return obj
                .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // for the js scripts
                .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '') // iframe
                .replace(/javascript:/gi, '')
                .replace(/on\w+\s*=/gi, ''); // remove atributes
        }
        if (typeof obj === 'object' && obj !== null) {
            for (const key in obj) {
                obj[key] = sanitizeInput(obj[key]);
            }
        }
        return obj;
    };
    req.body = sanitizeInput(req.body);
    if (req.query)
        sanitizeInput(req.query);
    if (req.params)
        sanitizeInput(req.params);
    next();
};
exports.xssProtection = xssProtection;
