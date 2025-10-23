# Constants Documentation

This directory contains all the constants used throughout the application. These constants help maintain consistency, prevent magic strings, and make the code more maintainable.

## 📁 File Structure

```
constants/
├── index.ts                 # Central export file
├── fieldNames.ts            # Database field names
├── apiEndpoints.ts          # API endpoint paths
├── redisKeys.ts             # Redis key patterns
├── socketEvents.ts          # Socket.io event names
├── chatFields.ts            # Chat and message fields
├── videoCallFields.ts       # Video call related fields
├── notificationTypes.ts     # Notification types and priorities
├── messages/                # Message constants
│   └── ResponseMessages.ts
├── StatusCodes.ts           # HTTP status codes
└── cookieVariable.ts        # Cookie configuration
```

## 🎯 Usage Examples

### 1. Database Field Names
```typescript
import { USER_FIELDS } from '../constants/fieldNames';

// Instead of magic strings
await userRepository.addUserRelations(
  senderId, 
  receiverId, 
  USER_FIELDS.FRIEND_REQUESTS, 
  USER_FIELDS.SENT_REQUESTS
);
```

### 2. Redis Keys
```typescript
import { REDIS_KEYS } from '../constants/redisKeys';

const userSessionKey = REDIS_KEYS.USER_SESSION(userId);
const chatRoomKey = REDIS_KEYS.CHAT_ROOM(roomId);
```

### 3. Socket Events
```typescript
import { SOCKET_EVENTS } from '../constants/socketEvents';

socket.emit(SOCKET_EVENTS.USER.ONLINE, { userId });
socket.on(SOCKET_EVENTS.CHAT.MESSAGE, handleMessage);
```

### 4. API Endpoints
```typescript
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const registerUrl = API_ENDPOINTS.USERS.REGISTER;
const chatUrl = API_ENDPOINTS.CHAT.SEND_MESSAGE;
```

## 🔧 Benefits

### **Type Safety**
- All constants are strongly typed
- IDE autocomplete and error checking
- Compile-time validation

### **Maintainability**
- Change values in one place
- Easy to refactor
- Consistent naming across the app

### **Documentation**
- Self-documenting code
- Clear intent and purpose
- Easy to understand for new developers

### **Performance**
- No runtime string creation
- Constants are optimized by TypeScript
- Better tree-shaking

## 🚀 Best Practices

### **1. Always Use Constants**
```typescript
// ❌ BAD - Magic strings
if (user.friendRequests.includes(senderId)) { }

// ✅ GOOD - Constants
if (user[USER_FIELDS.FRIEND_REQUESTS].includes(senderId)) { }
```

### **2. Group Related Constants**
```typescript
// ✅ GOOD - Grouped by functionality
export const USER_FIELDS = {
  FRIEND_REQUESTS: 'friendRequests',
  SENT_REQUESTS: 'sentRequests'
} as const;
```

### **3. Use Descriptive Names**
```typescript
// ✅ GOOD - Clear and descriptive
export const MESSAGE_STATUS = {
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read'
} as const;
```

### **4. Export from Index**
```typescript
// ✅ GOOD - Central export
export * from './fieldNames';
export * from './apiEndpoints';
```

## 📊 Constants by Feature

### **User Management**
- `USER_FIELDS` - Database field names
- `API_ENDPOINTS.USERS` - User API endpoints
- `SOCKET_EVENTS.USER` - User socket events

### **Chat System**
- `CHAT_FIELDS` - Chat database fields
- `MESSAGE_TYPES` - Message type constants
- `SOCKET_EVENTS.CHAT` - Chat socket events

### **Video Calls**
- `VIDEO_CALL_FIELDS` - Call database fields
- `CALL_TYPES` - Call type constants
- `SOCKET_EVENTS.VIDEO_CALL` - Call socket events

### **Notifications**
- `NOTIFICATION_TYPES` - Notification type constants
- `NOTIFICATION_PRIORITIES` - Priority levels
- `REDIS_KEYS.USER_NOTIFICATIONS` - Notification storage keys

## 🔄 Migration Guide

When adding new constants:

1. **Create the constant file** in the appropriate location
2. **Export from index.ts** for easy importing
3. **Update existing code** to use the new constants
4. **Add validation** if needed
5. **Update documentation** and tests

## 🧪 Testing Constants

```typescript
import { USER_FIELDS } from '../constants/fieldNames';

describe('Constants', () => {
  it('should have valid field names', () => {
    expect(USER_FIELDS.FRIEND_REQUESTS).toBe('friendRequests');
    expect(USER_FIELDS.SENT_REQUESTS).toBe('sentRequests');
  });
});
```

This constants system makes your codebase more professional, maintainable, and ready for production! 🚀
