import mongoose from "mongoose"
import ENV from "../utils/env"
import logger from "../utils/logger"

const ConnectMongo = async () => {
    const mongoUri = ENV.MONGO_URI || "mongodb://admin:admin@localhost:27017/mediaforge"
    try {
        await mongoose.connect(mongoUri)
        logger.info("MongoDB connected")
    } catch (error) {
        logger.error("MongoDB connection error", error)
        process.exit(1)
    }
}

export default ConnectMongo