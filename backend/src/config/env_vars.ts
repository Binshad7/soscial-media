import dotenv from "dotenv";
dotenv.config();

interface EnvConfig {
    MONGO_URL: string;
    PORT: number | string;
    FRONTEND_URL: string;
    JWT_SECRET: string,
    NODE_ENV: string,
    FRONTEND_ORIGINS?: string,
    COOKIE_SAMESITE?: string
}

export const ENV: EnvConfig = {
    MONGO_URL: process.env.MONGO_URL as string,
    PORT: process.env.PORT || 5000,
    FRONTEND_URL: process.env.FRONTEND_URL as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    NODE_ENV: process.env.NODE_ENV as string,
    FRONTEND_ORIGINS: process.env.FRONTEND_ORIGINS,
    COOKIE_SAMESITE: process.env.COOKIE_SAMESITE
};
