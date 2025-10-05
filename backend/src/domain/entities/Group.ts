import { Types } from 'mongoose';
import { IMessage } from './Chat';

export interface IGroup {
    _id?: Types.ObjectId;
    name: string;
    description?: string;
    avatar?: string;
    members: string[];
    admins: string[];
    messages: IMessage[];
    activeCall?: {
        roomId?: string;
        inCall: boolean;
    };
}