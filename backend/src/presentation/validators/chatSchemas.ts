import { z } from "zod";
import { MESSAGE_TYPES, CHAT_ROOM_TYPES } from "../../constants/chatFields";

export const sendMessageSchema = z.object({
  content: z.string()
    .min(1, "Message content is required")
    .max(1000, "Message content must be at most 1000 characters"),
  messageType: z.enum(Object.values(MESSAGE_TYPES) as [string, ...string[]], {
    errorMap: () => ({ message: "Invalid message type" })
  }),
  roomId: z.string()
    .regex(/^[a-f\d]{24}$/i, "Invalid room ID format")
    .min(24, "Invalid room ID length")
    .max(24, "Invalid room ID length"),
  replyTo: z.string()
    .regex(/^[a-f\d]{24}$/i, "Invalid reply message ID")
    .optional()
});

export const createChatRoomSchema = z.object({
  name: z.string()
    .min(1, "Room name is required")
    .max(50, "Room name must be at most 50 characters")
    .optional(),
  type: z.enum(Object.values(CHAT_ROOM_TYPES) as [string, ...string[]], {
    errorMap: () => ({ message: "Invalid room type" })
  }),
  participants: z.array(z.string().regex(/^[a-f\d]{24}$/i, "Invalid user ID"))
    .min(1, "At least one participant is required")
    .max(100, "Too many participants")
});

export const joinRoomSchema = z.object({
  roomId: z.string()
    .regex(/^[a-f\d]{24}$/i, "Invalid room ID format")
    .min(24, "Invalid room ID length")
    .max(24, "Invalid room ID length")
});

export const typingSchema = z.object({
  roomId: z.string()
    .regex(/^[a-f\d]{24}$/i, "Invalid room ID format"),
  isTyping: z.boolean()
});
