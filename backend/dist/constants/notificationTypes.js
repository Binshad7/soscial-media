"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOTIFICATION_STATUS = exports.NOTIFICATION_CHANNELS = exports.NOTIFICATION_PRIORITIES = exports.NOTIFICATION_TYPES = void 0;
// Notification Types Constants
exports.NOTIFICATION_TYPES = {
    FOLLOW_REQUEST: 'follow_request',
    FOLLOW_ACCEPTED: 'follow_accepted',
    NEW_MESSAGE: 'new_message',
    MESSAGE_LIKE: 'message_like',
    MESSAGE_REPLY: 'message_reply',
    GROUP_INVITE: 'group_invite',
    GROUP_MESSAGE: 'group_message',
    CALL_INCOMING: 'call_incoming',
    CALL_MISSED: 'call_missed',
    SYSTEM_ANNOUNCEMENT: 'system_announcement'
};
// Notification priorities
exports.NOTIFICATION_PRIORITIES = {
    LOW: 'low',
    NORMAL: 'normal',
    HIGH: 'high',
    URGENT: 'urgent'
};
// Notification channels
exports.NOTIFICATION_CHANNELS = {
    IN_APP: 'in_app',
    EMAIL: 'email',
    PUSH: 'push',
    SMS: 'sms'
};
// Notification status
exports.NOTIFICATION_STATUS = {
    UNREAD: 'unread',
    READ: 'read',
    ARCHIVED: 'archived',
    DELETED: 'deleted'
};
