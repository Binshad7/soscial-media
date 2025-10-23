// Notification Types Constants
export const NOTIFICATION_TYPES = {
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
} as const;

// Notification priorities
export const NOTIFICATION_PRIORITIES = {
  LOW: 'low',
  NORMAL: 'normal',
  HIGH: 'high',
  URGENT: 'urgent'
} as const;

// Notification channels
export const NOTIFICATION_CHANNELS = {
  IN_APP: 'in_app',
  EMAIL: 'email',
  PUSH: 'push',
  SMS: 'sms'
} as const;

// Notification status
export const NOTIFICATION_STATUS = {
  UNREAD: 'unread',
  READ: 'read',
  ARCHIVED: 'archived',
  DELETED: 'deleted'
} as const;
