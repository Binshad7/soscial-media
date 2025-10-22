import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../../shared/helpers/loger';

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
  crossOriginEmbedderPolicy: false, // Disable for API
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
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
  // Remove any script tags or dangerous HTML
  const sanitizeInput = (obj: any): any => {
    if (typeof obj === 'string') {
      return obj
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') //<script> tags (inline JS)
        .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '') //<iframe> tags (used for phishing)
        .replace(/javascript:/gi, '') //javascript: URLs
        .replace(/on\w+\s*=/gi, ''); //onClick=, onMouseOver= (JS event attributes)
    }
    if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        obj[key] = sanitizeInput(obj[key]);
      }
    }
    return obj;
  };

  req.body = sanitizeInput(req.body);
  req.query = sanitizeInput(req.query);
  req.params = sanitizeInput(req.params);

  next();
};
