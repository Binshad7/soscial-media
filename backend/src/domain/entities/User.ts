export interface IUser {
    _id?: string;
    username: string;
    email: string;
    confirm_password: string;
    password: string;
    displayName?: string;
    avatar?: string;
    bio?: string;
    status?: 'online' | 'offline' | 'busy';
    followers?: string[];
    following?: string[];
    friendRequests?: string[]; // incoming requests
    sentRequests?: string[];   // outgoing requests
    groups?: string[];
    lastSeen?: Date;
}
