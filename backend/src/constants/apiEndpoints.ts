// API Endpoints Constants
export const API_ENDPOINTS = {
  USERS: {
    REGISTER: '/api/v1/users/register',
    LOGIN: '/api/v1/users/login',
    SEND_FOLLOW_REQUEST: '/api/v1/users/sendRequest',
    ACCEPT_FOLLOW_REQUEST: '/api/v1/users/acceptRequest',
    REJECT_FOLLOW_REQUEST: '/api/v1/users/rejectRequest',
    GET_FOLLOWERS: '/api/v1/users/followers',
    GET_FOLLOWING: '/api/v1/users/following',
    GET_REQUESTS: '/api/v1/users/requests',
    SEARCH_USERS: '/api/v1/users/search',
    UPDATE_PROFILE: '/api/v1/users/profile',
    CHANGE_PASSWORD: '/api/v1/users/change-password'
  },
  CHAT: {
    SEND_MESSAGE: '/api/v1/users/chats/message',
    GET_MESSAGES: '/api/v1/users/chats/messages',
    GET_CONVERSATIONS: '/api/v1/users/chats/conversations',
    MARK_AS_READ: '/api/v1/users/chats/read'
  },
  GROUPS: {
    CREATE: '/api/v1/users/groups/create',
    JOIN: '/api/v1/users/groups/join',
    LEAVE: '/api/v1/users/groups/leave',
    GET_MEMBERS: '/api/v1/users/groups/members',
    UPDATE_SETTINGS: '/api/v1/users/groups/settings'
  },
  VIDEO_CALLS: {
    START_CALL: '/api/v1/users/videocalls/start',
    END_CALL: '/api/v1/users/videocalls/end',
    GET_ACTIVE_CALLS: '/api/v1/users/videocalls/active'
  }
} as const;
