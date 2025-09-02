import dotenv from 'dotenv'
dotenv.config()

const ENV = {
    PORT: Number(process.env.PORT) || 3000,

    // Redis 
    REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
    CACHE_TTL_SECONDS: Number(process.env.CACHE_TTL_SECONDS) || 86400,

    // Signing 
    SIGNING_SECRET: process.env.SIGNING_SECRET || '',

    // S3 / MinIO
    S3_ENDPOINT: process.env.S3_ENDPOINT,
    S3_REGION: process.env.S3_REGION || 'us-east-1',
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY || '',
    S3_SECRET_KEY: process.env.S3_SECRET_KEY || '',
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME || 'mediaforge',
    S3_FORCE_PATH_STYLE: (process.env.S3_FORCE_PATH_STYLE || 'true') === "true",

    // MongoDB
    MONGO_URI: process.env.MONGO_URI || "mongodb://admin:admin@localhost:27017/mediaforge",
}

export default ENV