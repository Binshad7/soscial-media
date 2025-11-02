"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPERATIONS = exports.USER_FIELDS = void 0;
// Database field names constants
exports.USER_FIELDS = {
    FRIEND_REQUESTS: 'friendRequests',
    SENT_REQUESTS: 'sentRequests',
    FOLLOWERS: 'followers',
    FOLLOWING: 'following'
};
// Operation types
exports.OPERATIONS = {
    ADD: 'add',
    REMOVE: 'remove'
};
