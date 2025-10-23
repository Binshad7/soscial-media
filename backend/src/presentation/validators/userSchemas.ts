import { z } from "zod";

export const registerSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(32, "Username must be at most 32 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string()
    .email("Invalid email format")
    .max(255, "Email must be at most 255 characters"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be at most 128 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one lowercase letter, one uppercase letter, and one number"), 
    confirm_password: z.string({})
}).refine((data) => data.password === data.confirm_password, {
  message: "Confirm Password dont match"
});

export const loginSchema = z.object({
  email: z.string()
    .email("Invalid email format")
    .max(255, "Email must be at most 255 characters"),
  password: z.string()
    .min(1, "Password is required")
    .max(128, "Password must be at most 128 characters")
});

export const sendFollowRequestSchema = z.object({
  receiverId: z.string()
    .regex(/^[a-f\d]{24}$/i, "Invalid user ID format")
    .min(24, "Invalid user ID length")
    .max(24, "Invalid user ID length")
});

export const updateProfileSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(32, "Username must be at most 32 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
    .optional(),
  status: z.enum(['online', 'offline', 'busy']).optional()
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string()
    .min(8, "New password must be at least 8 characters")
    .max(128, "New password must be at most 128 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "New password must contain at least one lowercase letter, one uppercase letter, and one number")
});
