"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidPassword = exports.isValidUsername = exports.isValidEmail = exports.isValidObjectId = exports.canTransitionCallStatus = exports.canTransitionMessageStatus = exports.validateNotificationPriority = exports.validateNotificationType = exports.validateMediaType = exports.validateCallStatus = exports.validateCallType = exports.validateRoomType = exports.validateMessageStatus = exports.validateMessageType = void 0;
// Validation helper functions
const chatFields_1 = require("../../constants/chatFields");
const videoCallFields_1 = require("../../constants/videoCallFields");
const notificationTypes_1 = require("../../constants/notificationTypes");
// Message validation
const validateMessageType = (type) => {
    return Object.values(chatFields_1.MESSAGE_TYPES).includes(type);
};
exports.validateMessageType = validateMessageType;
const validateMessageStatus = (status) => {
    return Object.values(chatFields_1.MESSAGE_STATUS).includes(status);
};
exports.validateMessageStatus = validateMessageStatus;
const validateRoomType = (type) => {
    return Object.values(chatFields_1.CHAT_ROOM_TYPES).includes(type);
};
exports.validateRoomType = validateRoomType;
// Call validation
const validateCallType = (type) => {
    return Object.values(videoCallFields_1.CALL_TYPES).includes(type);
};
exports.validateCallType = validateCallType;
const validateCallStatus = (status) => {
    return Object.values(videoCallFields_1.CALL_STATUS).includes(status);
};
exports.validateCallStatus = validateCallStatus;
const validateMediaType = (type) => {
    return Object.values(videoCallFields_1.MEDIA_TYPES).includes(type);
};
exports.validateMediaType = validateMediaType;
// Notification validation
const validateNotificationType = (type) => {
    return Object.values(notificationTypes_1.NOTIFICATION_TYPES).includes(type);
};
exports.validateNotificationType = validateNotificationType;
const validateNotificationPriority = (priority) => {
    return Object.values(notificationTypes_1.NOTIFICATION_PRIORITIES).includes(priority);
};
exports.validateNotificationPriority = validateNotificationPriority;
// Status transition validation
const canTransitionMessageStatus = (from, to) => {
    const validTransitions = {
        [chatFields_1.MESSAGE_STATUS.SENT]: [chatFields_1.MESSAGE_STATUS.DELIVERED, chatFields_1.MESSAGE_STATUS.FAILED],
        [chatFields_1.MESSAGE_STATUS.DELIVERED]: [chatFields_1.MESSAGE_STATUS.READ],
        [chatFields_1.MESSAGE_STATUS.READ]: [] // Terminal state
    };
    return validTransitions[from]?.includes(to) || false;
};
exports.canTransitionMessageStatus = canTransitionMessageStatus;
const canTransitionCallStatus = (from, to) => {
    const validTransitions = {
        [videoCallFields_1.CALL_STATUS.INITIATED]: [videoCallFields_1.CALL_STATUS.RINGING, videoCallFields_1.CALL_STATUS.REJECTED, videoCallFields_1.CALL_STATUS.ENDED],
        [videoCallFields_1.CALL_STATUS.RINGING]: [videoCallFields_1.CALL_STATUS.ACCEPTED, videoCallFields_1.CALL_STATUS.REJECTED, videoCallFields_1.CALL_STATUS.MISSED, videoCallFields_1.CALL_STATUS.ENDED],
        [videoCallFields_1.CALL_STATUS.ACCEPTED]: [videoCallFields_1.CALL_STATUS.ENDED],
        [videoCallFields_1.CALL_STATUS.ENDED]: [] // Terminal state
    };
    return validTransitions[from]?.includes(to) || false;
};
exports.canTransitionCallStatus = canTransitionCallStatus;
// ObjectId validation
const isValidObjectId = (id) => {
    return /^[a-f\d]{24}$/i.test(id);
};
exports.isValidObjectId = isValidObjectId;
// Email validation
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
exports.isValidEmail = isValidEmail;
// Username validation
const isValidUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,32}$/;
    return usernameRegex.test(username);
};
exports.isValidUsername = isValidUsername;
// Password validation
const isValidPassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};
exports.isValidPassword = isValidPassword;
