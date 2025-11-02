"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typingSchema = exports.joinRoomSchema = exports.createChatRoomSchema = exports.sendMessageSchema = void 0;
const zod_1 = require("zod");
const chatFields_1 = require("../../constants/chatFields");
exports.sendMessageSchema = zod_1.z.object({
    content: zod_1.z.string()
        .min(1, "Message content is required")
        .max(1000, "Message content must be at most 1000 characters"),
    messageType: zod_1.z.enum(Object.values(chatFields_1.MESSAGE_TYPES), {
        errorMap: () => ({ message: "Invalid message type" })
    }),
    roomId: zod_1.z.string()
        .regex(/^[a-f\d]{24}$/i, "Invalid room ID format")
        .min(24, "Invalid room ID length")
        .max(24, "Invalid room ID length"),
    replyTo: zod_1.z.string()
        .regex(/^[a-f\d]{24}$/i, "Invalid reply message ID")
        .optional()
});
exports.createChatRoomSchema = zod_1.z.object({
    name: zod_1.z.string()
        .min(1, "Room name is required")
        .max(50, "Room name must be at most 50 characters")
        .optional(),
    type: zod_1.z.enum(Object.values(chatFields_1.CHAT_ROOM_TYPES), {
        errorMap: () => ({ message: "Invalid room type" })
    }),
    participants: zod_1.z.array(zod_1.z.string().regex(/^[a-f\d]{24}$/i, "Invalid user ID"))
        .min(1, "At least one participant is required")
        .max(100, "Too many participants")
});
exports.joinRoomSchema = zod_1.z.object({
    roomId: zod_1.z.string()
        .regex(/^[a-f\d]{24}$/i, "Invalid room ID format")
        .min(24, "Invalid room ID length")
        .max(24, "Invalid room ID length")
});
exports.typingSchema = zod_1.z.object({
    roomId: zod_1.z.string()
        .regex(/^[a-f\d]{24}$/i, "Invalid room ID format"),
    isTyping: zod_1.z.boolean()
});
