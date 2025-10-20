import mongoose, { Schema, Document } from "mongoose";
import { IChat, IMessage } from '../../../../domain/entities/Chat';

const MessageSchema: Schema = new Schema<IMessage>({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: String,
    mediaUrl: String,
    messageType: { type: String, enum: ['text', 'image', 'video', 'audio'], default: 'text' },
    createdAt: { type: Date, default: Date.now }
});

const ChatSchema: Schema = new Schema<IChat>({
    participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    messages: [MessageSchema],
    isGroup: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model<IChat & Document>("Chat", ChatSchema);