import { Router } from "express";
import { userController } from "../container";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import { authLimiter, followRequestLimiter } from "../middlewares/rateLimiter";
import { registerSchema, loginSchema, sendFollowRequestSchema } from "../validators/userSchemas";

const router = Router();

// Auth routes with rate limiting and validation
router.post("/register", authLimiter, validate(registerSchema), userController.register);
router.post("/login", authLimiter, validate(loginSchema), userController.login);

// Protected routes
router.patch('/sendRequest/:reciverID', 
  authMiddleware, 
  followRequestLimiter, 
  validate(sendFollowRequestSchema, "params"), 
  userController.sendFollowRequest
);
// router.patch('/acceptRequest/:userId', authMiddleware, (req, res) => { });
// router.get('/getRequests', authMiddleware, (req, res) => { });
// router.get('/getFriends', authMiddleware, (req, res) => { });
// router.get('/searchUsers', authMiddleware, (req, res) => { });

export default router;