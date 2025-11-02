"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinCallSchema = exports.endCallSchema = exports.answerCallSchema = exports.startCallSchema = void 0;
const zod_1 = require("zod");
const videoCallFields_1 = require("../../constants/videoCallFields");
exports.startCallSchema = zod_1.z.object({
    receiverId: zod_1.z.string()
        .regex(/^[a-f\d]{24}$/i, "Invalid receiver ID format")
        .min(24, "Invalid receiver ID length")
        .max(24, "Invalid receiver ID length"),
    callType: zod_1.z.enum(Object.values(videoCallFields_1.CALL_TYPES), {
        errorMap: () => ({ message: "Invalid call type" })
    }),
    mediaType: zod_1.z.enum(Object.values(videoCallFields_1.MEDIA_TYPES), {
        errorMap: () => ({ message: "Invalid media type" })
    }),
    groupId: zod_1.z.string()
        .regex(/^[a-f\d]{24}$/i, "Invalid group ID format")
        .optional()
});
exports.answerCallSchema = zod_1.z.object({
    callId: zod_1.z.string()
        .regex(/^[a-f\d]{24}$/i, "Invalid call ID format")
        .min(24, "Invalid call ID length")
        .max(24, "Invalid call ID length"),
    accepted: zod_1.z.boolean()
});
exports.endCallSchema = zod_1.z.object({
    callId: zod_1.z.string()
        .regex(/^[a-f\d]{24}$/i, "Invalid call ID format")
        .min(24, "Invalid call ID length")
        .max(24, "Invalid call ID length"),
    reason: zod_1.z.string()
        .max(100, "Reason must be at most 100 characters")
        .optional()
});
exports.joinCallSchema = zod_1.z.object({
    callId: zod_1.z.string()
        .regex(/^[a-f\d]{24}$/i, "Invalid call ID format")
        .min(24, "Invalid call ID length")
        .max(24, "Invalid call ID length"),
    mediaType: zod_1.z.enum(Object.values(videoCallFields_1.MEDIA_TYPES), {
        errorMap: () => ({ message: "Invalid media type" })
    })
});
