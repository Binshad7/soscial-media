    import jsonWebToken from 'jsonwebtoken';
    import { ENV } from '../../shared/config/env.config';

    export const verifyToken = async (token: string) => {
        const decoded = jsonWebToken.verify(token, ENV.JWT_SECRET);
        return decoded
    }