import dotenv from "dotenv";
dotenv.config();

interface redisEnvConfig {

    REDIS_PASS: string,
    REDIS_HOST: string,
    REDIS_PORT: number,
    REDIS_USERNAME: string
}

export const REDIS_CONFIG: redisEnvConfig = {
    REDIS_USERNAME: process.env.REDIS_USERNAME as string,
    REDIS_PASS: process.env.REDIS_PASS as string,
    REDIS_HOST: process.env.REDIS_HOST as string,
    REDIS_PORT: Number(process.env.REDIS_PORT),
};
