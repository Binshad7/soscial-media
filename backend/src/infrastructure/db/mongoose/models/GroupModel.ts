import mongoose, { Schema, Document, Types } from "mongoose";
import { IGroup } from "../../../../domain/entities/Group";
import { IMessage } from "../../../../domain/entities/Chat";

const GroupMessageSchema = new Schema<IMessage>({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: String,
    mediaUrl: String,
    messageType: { type: String, enum: ['text', 'image', 'video', 'audio'], default: 'text' },
    createdAt: { type: Date, default: Date.now }
});

const GroupSchema = new Schema<IGroup>({
    name: { type: String, required: true },
    description: String,
    avatar: String,
    members: [{ type: Types.ObjectId, ref: 'User' }],
    admins: [{ type: Types.ObjectId, ref: 'User' }],
    messages: [GroupMessageSchema],
    activeCall: {
        roomId: String,
        inCall: { type: Boolean, default: false }
    }
}, { timestamps: true });

const GroupModel = mongoose.model<IGroup>("Group", GroupSchema);
export default GroupModel;
