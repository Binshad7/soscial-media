import { Request, Response, NextFunction } from "express";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // Dummy: always allow. Replace with JWT/session auth as needed.
  next();
}