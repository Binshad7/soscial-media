import { UserSession } from "../../infrastructure/services/redis/types/UserSession";

declare global {
  namespace Express {
    interface Request {
      user?: UserSession;
    }
  }
}

// export { }