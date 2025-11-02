"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REDIS_KEYS = void 0;
// Redis Keys Constants
exports.REDIS_KEYS = {
    // User session keys
    USER_SESSION: (userId) => `user:${userId}`,
    REFRESH_TOKEN: (userId) => `refresh:${userId}`,
    USER_ONLINE_STATUS: (userId) => `online:${userId}`,
    // Chat related keys
    CHAT_ROOM: (roomId) => `chat:${roomId}`,
    CHAT_MESSAGES: (roomId) => `messages:${roomId}`,
    USER_TYPING: (userId, roomId) => `typing:${userId}:${roomId}`,
    // Group chat keys
    GROUP_MEMBERS: (groupId) => `group:${groupId}:members`,
    GROUP_MESSAGES: (groupId) => `group:${groupId}:messages`,
    // Video call keys
    ACTIVE_CALL: (callId) => `call:${callId}`,
    CALL_PARTICIPANTS: (callId) => `call:${callId}:participants`,
    // Notification keys
    USER_NOTIFICATIONS: (userId) => `notifications:${userId}`,
    UNREAD_COUNT: (userId) => `unread:${userId}`,
    // Rate limiting keys
    RATE_LIMIT: (ip, endpoint) => `rate_limit:${ip}:${endpoint}`,
    // Cache keys
    USER_PROFILE: (userId) => `profile:${userId}`,
    USER_FRIENDS: (userId) => `friends:${userId}`,
    SEARCH_RESULTS: (query) => `search:${query}`
};
