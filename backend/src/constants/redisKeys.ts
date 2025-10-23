// Redis Keys Constants
export const REDIS_KEYS = {
  // User session keys
  USER_SESSION: (userId: string) => `user:${userId}`,
  REFRESH_TOKEN: (userId: string) => `refresh:${userId}`,
  USER_ONLINE_STATUS: (userId: string) => `online:${userId}`,
  
  // Chat related keys
  CHAT_ROOM: (roomId: string) => `chat:${roomId}`,
  CHAT_MESSAGES: (roomId: string) => `messages:${roomId}`,
  USER_TYPING: (userId: string, roomId: string) => `typing:${userId}:${roomId}`,
  
  // Group chat keys
  GROUP_MEMBERS: (groupId: string) => `group:${groupId}:members`,
  GROUP_MESSAGES: (groupId: string) => `group:${groupId}:messages`,
  
  // Video call keys
  ACTIVE_CALL: (callId: string) => `call:${callId}`,
  CALL_PARTICIPANTS: (callId: string) => `call:${callId}:participants`,
  
  // Notification keys
  USER_NOTIFICATIONS: (userId: string) => `notifications:${userId}`,
  UNREAD_COUNT: (userId: string) => `unread:${userId}`,
  
  // Rate limiting keys
  RATE_LIMIT: (ip: string, endpoint: string) => `rate_limit:${ip}:${endpoint}`,
  
  // Cache keys
  USER_PROFILE: (userId: string) => `profile:${userId}`,
  USER_FRIENDS: (userId: string) => `friends:${userId}`,
  SEARCH_RESULTS: (query: string) => `search:${query}`
} as const;
