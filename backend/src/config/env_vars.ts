import dotenv from "dotenv";
dotenv.config();

interface EnvConfig {
    MONGO_URL: string;
    PORT: number | string;
    FRONTENT_URL: string;
    JWT_SECRET: string,
    NODE_ENV: string
}

export const ENV: EnvConfig = {
    MONGO_URL: process.env.MONGO_URL as string,
    PORT: process.env.PORT || 5000,
    FRONTENT_URL: process.env.FRONTENT_URL as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    NODE_ENV: process.env.NODE_ENV as string
};
