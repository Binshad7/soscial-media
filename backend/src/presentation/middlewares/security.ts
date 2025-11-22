import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../../shared/utils/loger';
import { ENV } from '../../shared/config/env.config';




export const allowedOrigins = (ENV.FRONTEND_ORIGINS ?? ENV.FRONTEND_URL ?? "")
  .split(",")
  .map(o => o.trim()) 
  .filter(Boolean);

export const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200
}
// Security headers middleware
export const securityHeaders = helmet({ //Defines which sources your frontend is allowed to load scripts, styles, and images from (CSP — Content Security Policy).
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
    maxAge: 31536000,//how long should be remember to use https
    includeSubDomains: true,
    preload: true // auto convention to http to https in browsers
  }
});

// MongoDB injection protection
export const mongoSanitization = mongoSanitize({
  replaceWith: '_',//it replace $ and . this symbol with _ this  ex email:{$ne:null}
  onSanitize: ({ req, key }) => {
    logger.warn(`MongoDB injection attempt detected: ${key} in ${req.path}`);
  }
});

// Request size limiter
export const requestSizeLimiter = (req: Request, res: Response, next: NextFunction) => {
  const contentLength = parseInt(req.get('content-length') || '0'); // to prevent 2gb req send that crash our server
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (contentLength > maxSize) {
    logger.warn(`Request too large: ${contentLength} bytes from ${req.ip}`);
    return res.status(413).json({
      success: false,
      message: 'Request entity too large'
    });
  }

  next();
};

// IP whitelist middleware (optional)
export const ipWhitelist = (allowedIPs: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const clientIP = req.ip || req.connection.remoteAddress;

    if (allowedIPs.length > 0 && !allowedIPs.includes(clientIP || '')) {
      logger.warn(`Unauthorized IP access attempt: ${clientIP}`);
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    next();
  };
};

// XSS protection middleware
export const xssProtection = (req: Request, res: Response, next: NextFunction) => {

  const sanitizeInput = (obj: any): any => {
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

  if (req.query) sanitizeInput(req.query);
  if (req.params) sanitizeInput(req.params);

  next();
};

