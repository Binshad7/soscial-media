"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canTransitionTo = exports.isValidCallType = exports.isValidCallStatus = exports.isValidMessageStatus = exports.isValidMessageType = exports.emitEvent = exports.getRedisKey = void 0;
// Utility functions for working with constants
const redisKeys_1 = require("../../constants/redisKeys");
const socketEvents_1 = require("../../constants/socketEvents");
const chatFields_1 = require("../../constants/chatFields");
const videoCallFields_1 = require("../../constants/videoCallFields");
// Redis key helpers
exports.getRedisKey = {
    userSession: (userId) => redisKeys_1.REDIS_KEYS.USER_SESSION(userId),
    refreshToken: (userId) => redisKeys_1.REDIS_KEYS.REFRESH_TOKEN(userId),
    chatRoom: (roomId) => redisKeys_1.REDIS_KEYS.CHAT_ROOM(roomId),
    userNotifications: (userId) => redisKeys_1.REDIS_KEYS.USER_NOTIFICATIONS(userId),
    rateLimit: (ip, endpoint) => redisKeys_1.REDIS_KEYS.RATE_LIMIT(ip, endpoint)
};
// Socket event helpers
exports.emitEvent = {
    userOnline: (userId) => socketEvents_1.SOCKET_EVENTS.USER.ONLINE,
    userOffline: (userId) => socketEvents_1.SOCKET_EVENTS.USER.OFFLINE,
    newMessage: (roomId) => socketEvents_1.SOCKET_EVENTS.CHAT.MESSAGE,
    typing: (userId, roomId) => socketEvents_1.SOCKET_EVENTS.CHAT.TYPING,
    callIncoming: (callId) => socketEvents_1.SOCKET_EVENTS.VIDEO_CALL.CALL_INITIATED
};
// Message validation helpers
const isValidMessageType = (type) => {
    return Object.values(chatFields_1.MESSAGE_TYPES).includes(type);
};
exports.isValidMessageType = isValidMessageType;
const isValidMessageStatus = (status) => {
    return Object.values(chatFields_1.MESSAGE_STATUS).includes(status);
};
exports.isValidMessageStatus = isValidMessageStatus;
const isValidCallStatus = (status) => {
    return Object.values(videoCallFields_1.CALL_STATUS).includes(status);
};
exports.isValidCallStatus = isValidCallStatus;
const isValidCallType = (type) => {
    return Object.values(videoCallFields_1.CALL_TYPES).includes(type);
};
exports.isValidCallType = isValidCallType;
// Status transition helpers
exports.canTransitionTo = {
    messageStatus: (from, to) => {
        const transitions = {
            [chatFields_1.MESSAGE_STATUS.SENT]: [chatFields_1.MESSAGE_STATUS.DELIVERED, chatFields_1.MESSAGE_STATUS.FAILED],
            [chatFields_1.MESSAGE_STATUS.DELIVERED]: [chatFields_1.MESSAGE_STATUS.READ],
            [chatFields_1.MESSAGE_STATUS.READ]: [] // Terminal state
        };
        return transitions[from]?.includes(to) || false;
    },
    callStatus: (from, to) => {
        const transitions = {
            [videoCallFields_1.CALL_STATUS.INITIATED]: [videoCallFields_1.CALL_STATUS.RINGING, videoCallFields_1.CALL_STATUS.REJECTED, videoCallFields_1.CALL_STATUS.ENDED],
            [videoCallFields_1.CALL_STATUS.RINGING]: [videoCallFields_1.CALL_STATUS.ACCEPTED, videoCallFields_1.CALL_STATUS.REJECTED, videoCallFields_1.CALL_STATUS.MISSED, videoCallFields_1.CALL_STATUS.ENDED],
            [videoCallFields_1.CALL_STATUS.ACCEPTED]: [videoCallFields_1.CALL_STATUS.ENDED],
            [videoCallFields_1.CALL_STATUS.ENDED]: [] // Terminal state
        };
        return transitions[from]?.includes(to) || false;
    }
};
