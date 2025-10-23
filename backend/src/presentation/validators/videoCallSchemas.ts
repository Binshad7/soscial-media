import { z } from "zod";
import { CALL_TYPES, MEDIA_TYPES } from "../../constants/videoCallFields";

export const startCallSchema = z.object({
  receiverId: z.string()
    .regex(/^[a-f\d]{24}$/i, "Invalid receiver ID format")
    .min(24, "Invalid receiver ID length")
    .max(24, "Invalid receiver ID length"),
  callType: z.enum(Object.values(CALL_TYPES) as [string, ...string[]], {
    errorMap: () => ({ message: "Invalid call type" })
  }),
  mediaType: z.enum(Object.values(MEDIA_TYPES) as [string, ...string[]], {
    errorMap: () => ({ message: "Invalid media type" })
  }),
  groupId: z.string()
    .regex(/^[a-f\d]{24}$/i, "Invalid group ID format")
    .optional()
});

export const answerCallSchema = z.object({
  callId: z.string()
    .regex(/^[a-f\d]{24}$/i, "Invalid call ID format")
    .min(24, "Invalid call ID length")
    .max(24, "Invalid call ID length"),
  accepted: z.boolean()
});

export const endCallSchema = z.object({
  callId: z.string()
    .regex(/^[a-f\d]{24}$/i, "Invalid call ID format")
    .min(24, "Invalid call ID length")
    .max(24, "Invalid call ID length"),
  reason: z.string()
    .max(100, "Reason must be at most 100 characters")
    .optional()
});

export const joinCallSchema = z.object({
  callId: z.string()
    .regex(/^[a-f\d]{24}$/i, "Invalid call ID format")
    .min(24, "Invalid call ID length")
    .max(24, "Invalid call ID length"),
  mediaType: z.enum(Object.values(MEDIA_TYPES) as [string, ...string[]], {
    errorMap: () => ({ message: "Invalid media type" })
  })
});
