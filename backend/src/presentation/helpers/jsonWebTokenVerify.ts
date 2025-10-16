    import jsonWebToken from 'jsonwebtoken';
    import { ENV } from '../../config/env_vars';

    export const verifyToken = async (token: string) => {
        const decoded = jsonWebToken.verify(token, ENV.JWT_SECRET);
        return decoded
    }