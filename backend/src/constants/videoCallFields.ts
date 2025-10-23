// Video Call Field Constants
export const VIDEO_CALL_FIELDS = {
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
} as const;

// Call types
export const CALL_TYPES = {
  ONE_TO_ONE: 'one_to_one',
  GROUP: 'group',
  CONFERENCE: 'conference'
} as const;

// Call status
export const CALL_STATUS = {
  INITIATED: 'initiated',
  RINGING: 'ringing',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  ENDED: 'ended',
  MISSED: 'missed',
  BUSY: 'busy'
} as const;

// Media types
export const MEDIA_TYPES = {
  AUDIO_ONLY: 'audio_only',
  VIDEO: 'video',
  SCREEN_SHARE: 'screen_share'
} as const;

// WebRTC events
export const WEBRTC_EVENTS = {
  OFFER: 'offer',
  ANSWER: 'answer',
  ICE_CANDIDATE: 'ice_candidate',
  CONNECTION_STATE_CHANGE: 'connection_state_change',
  DATA_CHANNEL_OPEN: 'data_channel_open',
  DATA_CHANNEL_MESSAGE: 'data_channel_message'
} as const;
