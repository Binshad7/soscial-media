export interface IUser {
    _id?: string;
    username: string;
    email: string;
    displayName?: string;
    avatar?: string;
    password: string;
    status?: 'online' | 'offline' | 'busy';
    contacts?: string[];
    groups?: string[];
    lastSeen?: Date;
}