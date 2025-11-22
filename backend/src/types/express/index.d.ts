import { UserSession } from "../../shared/types/User";

declare global {
  namespace Express {
    interface Request {
      user?: UserSession;
    }
  }
}

