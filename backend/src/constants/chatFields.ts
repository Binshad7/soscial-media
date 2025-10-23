// Chat and Message Field Constants
export const CHAT_FIELDS = {
  MESSAGES: 'messages',
  PARTICIPANTS: 'participants',
  LAST_MESSAGE: 'lastMessage',
  UNREAD_COUNT: 'unreadCount',
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
  MESSAGE_TYPE: 'messageType',
  SENDER: 'sender',
  CONTENT: 'content',
  TIMESTAMP: 'timestamp',
  IS_READ: 'isRead',
  READ_BY: 'readBy'
} as const;

// Message types
export const MESSAGE_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
  FILE: 'file',
  VOICE_MESSAGE: 'voice_message',
  SYSTEM: 'system'
} as const;

// Chat room types
export const CHAT_ROOM_TYPES = {
  PRIVATE: 'private',
  GROUP: 'group',
  CHANNEL: 'channel'
} as const;

// Message status
export const MESSAGE_STATUS = {
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read',
  FAILED: 'failed'
} as const;
