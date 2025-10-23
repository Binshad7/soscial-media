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
router.patch('/sendRequest/:receiverId', authMiddleware, followRequestLimiter, validate(sendFollowRequestSchema, "params"), userController.sendFollowRequest);
router.patch('/acceptRequest/:receiverId', authMiddleware, validate(sendFollowRequestSchema, "params"), userController.acceptFollowRequest);
router.patch('/rejectRequest/:receiverId', authMiddleware, validate(sendFollowRequestSchema, "params"), userController.rejectFollowRequest);


export default router;