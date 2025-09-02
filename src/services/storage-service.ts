import {
  PutObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Client from "../config/s3-client";
import ENV  from "../utils/env";
import { Readable } from "stream";
import { v4 as uuidv4 } from "uuid";

const BUCKET = ENV.S3_BUCKET_NAME

const derivedKey = (publicId: string, w?: number, h?: number, format = "jpeg") => {
    const size = `${w || 0}x${h || 0}`;
    return `derived/${publicId}/${size}.${format}`;
}

const generateUploadUrl = async (mimeType: string) => {
    const publicId = uuidv4()
    const key = `uploads/${publicId}`;
    const cmd = new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        ContentType: mimeType,
    })
    const uploadUrl = await getSignedUrl(s3Client, cmd, { expiresIn: 60 * 5 })
    return { uploadUrl, publicId, key }
}

const putObject = async (key: string, body: Buffer, contentType?: string) => {
    await s3Client.send(
        new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: body,
        ContentType: contentType,
        CacheControl: "public, max-age=31536000, immutable",
        })
    );
}

const getObject = async (key: string): Promise<Buffer>  => {
    const r: any = await s3Client.send(new GetObjectCommand({ Bucket: BUCKET, Key: key }));
    const stream = r.Body as Readable;
    const chunks: Buffer[] = [];
    for await (const c of stream) chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c));
    return Buffer.concat(chunks);
}

const exists = async (key: string): Promise<boolean> => {
    try {
        await s3Client.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }));
        return true;
    } catch {
        return false;
    }
}

export { generateUploadUrl, putObject, getObject, exists, derivedKey }
