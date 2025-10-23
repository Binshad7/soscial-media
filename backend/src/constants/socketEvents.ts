// Socket Events Constants
export const SOCKET_EVENTS = {
  // User events
  USER: {
    ONLINE: 'user:online',
    OFFLINE: 'user:offline',
    TYPING: 'user:typing',
    STOP_TYPING: 'user:stop_typing',
    STATUS_CHANGE: 'user:status_change',
    PROFILE_UPDATE: 'user:profile_update'
  },
  
  // Chat events
  CHAT: {
    MESSAGE: 'chat:message',
    MESSAGE_SENT: 'chat:message_sent',
    MESSAGE_DELIVERED: 'chat:message_delivered',
    MESSAGE_READ: 'chat:message_read',
    JOIN_ROOM: 'chat:join_room',
    LEAVE_ROOM: 'chat:leave_room',
    TYPING: 'chat:typing',
    STOP_TYPING: 'chat:stop_typing',
    NEW_CONVERSATION: 'chat:new_conversation'
  },
  
  // Group chat events
  GROUP: {
    MESSAGE: 'group:message',
    JOIN_GROUP: 'group:join',
    LEAVE_GROUP: 'group:leave',
    MEMBER_ADDED: 'group:member_added',
    MEMBER_REMOVED: 'group:member_removed',
    GROUP_UPDATED: 'group:updated'
  },
  
  // Video call events
  VIDEO_CALL: {
    CALL_INITIATED: 'call:initiated',
    CALL_ACCEPTED: 'call:accepted',
    CALL_REJECTED: 'call:rejected',
    CALL_ENDED: 'call:ended',
    JOIN_CALL: 'call:join',
    LEAVE_CALL: 'call:leave',
    CALL_PARTICIPANT_JOINED: 'call:participant_joined',
    CALL_PARTICIPANT_LEFT: 'call:participant_left'
  },
  
  // Notification events
  NOTIFICATION: {
    NEW_FOLLOW_REQUEST: 'notification:follow_request',
    FOLLOW_REQUEST_ACCEPTED: 'notification:follow_accepted',
    NEW_MESSAGE: 'notification:new_message',
    CALL_INCOMING: 'notification:call_incoming'
  },
  
  // Error events
  ERROR: {
    AUTHENTICATION_FAILED: 'error:auth_failed',
    PERMISSION_DENIED: 'error:permission_denied',
    ROOM_NOT_FOUND: 'error:room_not_found',
    USER_NOT_FOUND: 'error:user_not_found'
  }
} as const;
