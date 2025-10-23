// Validation helper functions
import { MESSAGE_TYPES, MESSAGE_STATUS, CHAT_ROOM_TYPES } from "../../constants/chatFields";
import { CALL_STATUS, CALL_TYPES, MEDIA_TYPES } from "../../constants/videoCallFields";
import { NOTIFICATION_TYPES, NOTIFICATION_PRIORITIES } from "../../constants/notificationTypes";

// Message validation
export const validateMessageType = (type: string): boolean => {
  return Object.values(MESSAGE_TYPES).includes(type as any);
};

export const validateMessageStatus = (status: string): boolean => {
  return Object.values(MESSAGE_STATUS).includes(status as any);
};

export const validateRoomType = (type: string): boolean => {
  return Object.values(CHAT_ROOM_TYPES).includes(type as any);
};

// Call validation
export const validateCallType = (type: string): boolean => {
  return Object.values(CALL_TYPES).includes(type as any);
};

export const validateCallStatus = (status: string): boolean => {
  return Object.values(CALL_STATUS).includes(status as any);
};

export const validateMediaType = (type: string): boolean => {
  return Object.values(MEDIA_TYPES).includes(type as any);
};

// Notification validation
export const validateNotificationType = (type: string): boolean => {
  return Object.values(NOTIFICATION_TYPES).includes(type as any);
};

export const validateNotificationPriority = (priority: string): boolean => {
  return Object.values(NOTIFICATION_PRIORITIES).includes(priority as any);
};

// Status transition validation
export const canTransitionMessageStatus = (from: string, to: string): boolean => {
  const validTransitions: Record<string, string[]> = {
    [MESSAGE_STATUS.SENT]: [MESSAGE_STATUS.DELIVERED, MESSAGE_STATUS.FAILED],
    [MESSAGE_STATUS.DELIVERED]: [MESSAGE_STATUS.READ],
    [MESSAGE_STATUS.READ]: [] // Terminal state
  };
  return validTransitions[from]?.includes(to) || false;
};

export const canTransitionCallStatus = (from: string, to: string): boolean => {
  const validTransitions: Record<string, string[]> = {
    [CALL_STATUS.INITIATED]: [CALL_STATUS.RINGING, CALL_STATUS.REJECTED, CALL_STATUS.ENDED],
    [CALL_STATUS.RINGING]: [CALL_STATUS.ACCEPTED, CALL_STATUS.REJECTED, CALL_STATUS.MISSED, CALL_STATUS.ENDED],
    [CALL_STATUS.ACCEPTED]: [CALL_STATUS.ENDED],
    [CALL_STATUS.ENDED]: [] // Terminal state
  };
  return validTransitions[from]?.includes(to) || false;
};

// ObjectId validation
export const isValidObjectId = (id: string): boolean => {
  return /^[a-f\d]{24}$/i.test(id);
};

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Username validation
export const isValidUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,32}$/;
  return usernameRegex.test(username);
};

// Password validation
export const isValidPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};
