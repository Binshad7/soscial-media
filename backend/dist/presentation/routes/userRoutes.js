"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const container_1 = require("../container");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validate_1 = require("../middlewares/validate");
const rateLimiter_1 = require("../middlewares/rateLimiter");
const userSchemas_1 = require("../validators/userSchemas");
const router = (0, express_1.Router)();
// Auth routes with rate limiting and validation
router.post("/register", rateLimiter_1.authLimiter, (0, validate_1.validate)(userSchemas_1.registerSchema), container_1.userController.register);
router.post("/login", rateLimiter_1.authLimiter, (0, validate_1.validate)(userSchemas_1.loginSchema), container_1.userController.login);
// cookie validation 
router.get('/auth/me', authMiddleware_1.authMiddleware, container_1.userController.userValidCheck);
// Protected routes
router.patch('/sendRequest/:receiverId', authMiddleware_1.authMiddleware, rateLimiter_1.followRequestLimiter, (0, validate_1.validate)(userSchemas_1.sendFollowRequestSchema, "params"), container_1.userController.sendFollowRequest);
router.patch('/acceptRequest/:receiverId', authMiddleware_1.authMiddleware, (0, validate_1.validate)(userSchemas_1.sendFollowRequestSchema, "params"), container_1.userController.acceptFollowRequest);
router.patch('/rejectRequest/:receiverId', authMiddleware_1.authMiddleware, (0, validate_1.validate)(userSchemas_1.sendFollowRequestSchema, "params"), container_1.userController.rejectFollowRequest);
exports.default = router;
