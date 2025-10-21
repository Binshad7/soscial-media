import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

// Extend Request interface to include requestId
declare global {
  namespace Express {
    interface Request {
      requestId: string;
    }
  }
}

export const requestId = (req: Request, res: Response, next: NextFunction) => {
  req.requestId = req.get('X-Request-ID') || uuidv4();
  res.set('X-Request-ID', req.requestId);
  next();
};
