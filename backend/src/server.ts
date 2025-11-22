import app from "./app";
import { connectDB } from "./config/connectDB";
import { ENV } from "./shared/config/env.config";
import { connectRedis } from "./config/redis.Client";
import { logger } from "./shared/utils/loger";

app.listen(ENV.PORT, () => {
    connectDB();
    connectRedis()
    logger.info("server running ")
})