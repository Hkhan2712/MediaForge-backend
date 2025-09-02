import app from "./app";
import ConnectMongo from "./config/mongo-client";
import ENV from "./utils/env";
import logger from "./utils/logger";

const start = async () => {
    await ConnectMongo()
    app.listen(ENV.PORT, () => {
        logger.info(`MediaForge listening on ${ENV.PORT}`);
    })
}

start()