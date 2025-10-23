// Utility functions for working with constants
import { REDIS_KEYS } from '../../constants/redisKeys';
import { SOCKET_EVENTS } from '../../constants/socketEvents';
import { MESSAGE_TYPES, MESSAGE_STATUS } from '../../constants/chatFields';
import { CALL_STATUS, CALL_TYPES } from '../../constants/videoCallFields';

// Redis key helpers
export const getRedisKey = {
  userSession: (userId: string) => REDIS_KEYS.USER_SESSION(userId),
  refreshToken: (userId: string) => REDIS_KEYS.REFRESH_TOKEN(userId),
  chatRoom: (roomId: string) => REDIS_KEYS.CHAT_ROOM(roomId),
  userNotifications: (userId: string) => REDIS_KEYS.USER_NOTIFICATIONS(userId),
  rateLimit: (ip: string, endpoint: string) => REDIS_KEYS.RATE_LIMIT(ip, endpoint)
};

// Socket event helpers
export const emitEvent = {
  userOnline: (userId: string) => SOCKET_EVENTS.USER.ONLINE,
  userOffline: (userId: string) => SOCKET_EVENTS.USER.OFFLINE,
  newMessage: (roomId: string) => SOCKET_EVENTS.CHAT.MESSAGE,
  typing: (userId: string, roomId: string) => SOCKET_EVENTS.CHAT.TYPING,
  callIncoming: (callId: string) => SOCKET_EVENTS.VIDEO_CALL.CALL_INITIATED
};

// Message validation helpers
export const isValidMessageType = (type: string): boolean => {
  return Object.values(MESSAGE_TYPES).includes(type as any);
};

export const isValidMessageStatus = (status: string): boolean => {
  return Object.values(MESSAGE_STATUS).includes(status as any);
};

export const isValidCallStatus = (status: string): boolean => {
  return Object.values(CALL_STATUS).includes(status as any);
};

export const isValidCallType = (type: string): boolean => {
  return Object.values(CALL_TYPES).includes(type as any);
};

// Status transition helpers
export const canTransitionTo = {
  messageStatus: (from: string, to: string): boolean => {
    const transitions: Record<string, string[]> = {
      [MESSAGE_STATUS.SENT]: [MESSAGE_STATUS.DELIVERED, MESSAGE_STATUS.FAILED],
      [MESSAGE_STATUS.DELIVERED]: [MESSAGE_STATUS.READ],
      [MESSAGE_STATUS.READ]: [] // Terminal state
    };
    return transitions[from]?.includes(to) || false;
  },
  
  callStatus: (from: string, to: string): boolean => {
    const transitions: Record<string, string[]> = {
      [CALL_STATUS.INITIATED]: [CALL_STATUS.RINGING, CALL_STATUS.REJECTED, CALL_STATUS.ENDED],
      [CALL_STATUS.RINGING]: [CALL_STATUS.ACCEPTED, CALL_STATUS.REJECTED, CALL_STATUS.MISSED, CALL_STATUS.ENDED],
      [CALL_STATUS.ACCEPTED]: [CALL_STATUS.ENDED],
      [CALL_STATUS.ENDED]: [] // Terminal state
    };
    return transitions[from]?.includes(to) || false;
  }
};
