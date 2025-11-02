"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGE_STATUS = exports.CHAT_ROOM_TYPES = exports.MESSAGE_TYPES = exports.CHAT_FIELDS = void 0;
// Chat and Message Field Constants
exports.CHAT_FIELDS = {
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
};
// Message types
exports.MESSAGE_TYPES = {
    TEXT: 'text',
    IMAGE: 'image',
    VIDEO: 'video',
    AUDIO: 'audio',
    FILE: 'file',
    VOICE_MESSAGE: 'voice_message',
    SYSTEM: 'system'
};
// Chat room types
exports.CHAT_ROOM_TYPES = {
    PRIVATE: 'private',
    GROUP: 'group',
    CHANNEL: 'channel'
};
// Message status
exports.MESSAGE_STATUS = {
    SENT: 'sent',
    DELIVERED: 'delivered',
    READ: 'read',
    FAILED: 'failed'
};
