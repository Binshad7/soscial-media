"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WEBRTC_EVENTS = exports.MEDIA_TYPES = exports.CALL_STATUS = exports.CALL_TYPES = exports.VIDEO_CALL_FIELDS = void 0;
// Video Call Field Constants
exports.VIDEO_CALL_FIELDS = {
    CALL_ID: 'callId',
    CALLER: 'caller',
    RECEIVER: 'receiver',
    PARTICIPANTS: 'participants',
    START_TIME: 'startTime',
    END_TIME: 'endTime',
    DURATION: 'duration',
    STATUS: 'status',
    TYPE: 'type',
    ROOM_ID: 'roomId'
};
// Call types
exports.CALL_TYPES = {
    ONE_TO_ONE: 'one_to_one',
    GROUP: 'group',
    CONFERENCE: 'conference'
};
// Call status
exports.CALL_STATUS = {
    INITIATED: 'initiated',
    RINGING: 'ringing',
    ACCEPTED: 'accepted',
    REJECTED: 'rejected',
    ENDED: 'ended',
    MISSED: 'missed',
    BUSY: 'busy'
};
// Media types
exports.MEDIA_TYPES = {
    AUDIO_ONLY: 'audio_only',
    VIDEO: 'video',
    SCREEN_SHARE: 'screen_share'
};
// WebRTC events
exports.WEBRTC_EVENTS = {
    OFFER: 'offer',
    ANSWER: 'answer',
    ICE_CANDIDATE: 'ice_candidate',
    CONNECTION_STATE_CHANGE: 'connection_state_change',
    DATA_CHANNEL_OPEN: 'data_channel_open',
    DATA_CHANNEL_MESSAGE: 'data_channel_message'
};
