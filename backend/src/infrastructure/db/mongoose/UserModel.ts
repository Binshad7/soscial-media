import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../../../domain/entities/User";

const UserSchema: Schema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  displayName: { type: String },
  bio: { type: String },
  status: { type: String, enum: ['online', 'offline', 'busy'], default: 'offline' },
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  friendRequests: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
  sentRequests: [{ type: Schema.Types.ObjectId, ref: 'User' }],   
  groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
  lastSeen: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model<IUser & Document>("User", UserSchema);

const MessageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  chat: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
  timestamp: { type: Date, default: Date.now }
});

const ChatSchema = new Schema({
  isGroupChat: { type: Boolean, default: false },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  groupName: { type: String },
  groupAvatar: { type: String },
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
}, { timestamps: true });

const CallSchema = new Schema({
  caller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['audio', 'video'], required: true },
  status: { type: String, enum: ['initiated', 'accepted', 'declined', 'ended'], default: 'initiated' },
  startedAt: { type: Date },
  endedAt: { type: Date },
  isGroupCall: { type: Boolean, default: false },
  groupId: { type: Schema.Types.ObjectId, ref: 'Group' }
}, { timestamps: true });
