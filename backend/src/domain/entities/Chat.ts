import { Types } from 'mongoose'
export interface IMessage {
    sender: Types.ObjectId;
    content?: string;
    mediaUrl?: string;
    messageType?: 'text' | 'image' | 'video' | 'audio';
    createdAt?: Date;
}

export interface IChat {
    _id?: Types.ObjectId;
    participants: string[];
    messages: IMessage[];
    isGroup?: false;
}