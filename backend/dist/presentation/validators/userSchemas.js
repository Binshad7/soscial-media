"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordSchema = exports.updateProfileSchema = exports.sendFollowRequestSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    username: zod_1.z.string()
        .min(3, "Username must be at least 3 characters")
        .max(32, "Username must be at most 32 characters")
        .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    email: zod_1.z.string()
        .email("Invalid email format")
        .max(255, "Email must be at most 255 characters"),
    password: zod_1.z.string()
        .min(6, "Password must be at least 8 characters")
        .max(128, "Password must be at most 128 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one lowercase letter, one uppercase letter, and one number"),
    confirm_password: zod_1.z.string({})
}).refine((data) => data.password === data.confirm_password, {
    message: "Confirm Password dont match"
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string()
        .email("Invalid email format")
        .max(255, "Email must be at most 255 characters"),
    password: zod_1.z.string()
        .min(1, "Password is required")
        .max(128, "Password must be at most 128 characters")
});
exports.sendFollowRequestSchema = zod_1.z.object({
    receiverId: zod_1.z.string()
        .regex(/^[a-f\d]{24}$/i, "Invalid user ID format")
        .min(24, "Invalid user ID length")
        .max(24, "Invalid user ID length")
});
exports.updateProfileSchema = zod_1.z.object({
    username: zod_1.z.string()
        .min(3, "Username must be at least 3 characters")
        .max(32, "Username must be at most 32 characters")
        .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
        .optional(),
    status: zod_1.z.enum(['online', 'offline', 'busy']).optional()
});
exports.changePasswordSchema = zod_1.z.object({
    currentPassword: zod_1.z.string().min(1, "Current password is required"),
    newPassword: zod_1.z.string()
        .min(8, "New password must be at least 8 characters")
        .max(128, "New password must be at most 128 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "New password must contain at least one lowercase letter, one uppercase letter, and one number")
});
