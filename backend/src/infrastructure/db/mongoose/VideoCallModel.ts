import mongoose, { Schema, Document } from "mongoose";
import { IVideoCall } from "../../../domain/entities/VideoCall";

const VideoCallSchema: Schema = new Schema<IVideoCall>({
  roomId: { type: String, required: true, unique: true },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  isGroup: { type: Boolean, default: false },
  startedAt: { type: Date, default: Date.now },
  endedAt: Date,
  status: { type: String, enum: ['active', 'ended'], default: 'active' }
}, { timestamps: true });

export default mongoose.model<IVideoCall & Document>("VideoCall", VideoCallSchema);