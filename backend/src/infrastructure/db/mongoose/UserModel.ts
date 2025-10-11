import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../../../domain/entities/User";

const UserSchema: Schema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, enum: ['online', 'offline', 'busy'], default: 'offline' },
  contacts: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
  lastSeen: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model<IUser & Document>("User", UserSchema);