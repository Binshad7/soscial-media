export interface IUser {
    _id?: string;
    username: string;
    email: string;
    password: string;
    confirm_password: string ;
    status?: 'online' | 'offline' | 'busy';
    followers?: string[];
    following?: string[];
    friendRequests?: string[]; // incoming requests
    sentRequests?: string[];   // outgoing requests
    groups?: string[];
    lastSeen?: Date;
}
