// Database field names constants
export const USER_FIELDS = {
  FRIEND_REQUESTS: 'friendRequests',
  SENT_REQUESTS: 'sentRequests',
  FOLLOWERS: 'followers',
  FOLLOWING: 'following'
} as const;

// Operation types
export const OPERATIONS = {
  ADD: 'add',
  REMOVE: 'remove'
} as const;
