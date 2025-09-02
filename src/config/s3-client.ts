import { S3Client } from "@aws-sdk/client-s3"
import ENV from "../utils/env"

const s3Client = new S3Client({
    region: ENV.S3_REGION,
    endpoint: ENV.S3_ENDPOINT,
    credentials: {
        accessKeyId: ENV.S3_ACCESS_KEY,
        secretAccessKey: ENV.S3_SECRET_KEY,
    },  
    forcePathStyle: ENV.S3_FORCE_PATH_STYLE,
})

export default s3Client