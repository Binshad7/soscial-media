import dotenv from "dotenv";
dotenv.config();

interface EnvConfig {
    MONGO_URL: string;
    PORT: number | string;
    FRONTENT_URL: string ;
}

export const ENV: EnvConfig = {
    MONGO_URL: process.env.MONGO_URL as string,
    PORT: process.env.PORT || 3000,
    FRONTENT_URL: process.env.FRONTENT_URL as string,
};
