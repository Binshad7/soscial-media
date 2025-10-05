export interface IVideoCall {
    _id?: string;
    roomId: string;
    participants: string[];
    isGroup: boolean;
    startedAt?: Date;
    endedAt?: Date;
    status: 'active' | 'ended';
}