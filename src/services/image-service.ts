import * as storage from "./storage-service";
import { getBuffer, setBuffer } from "../utils/cache";
import {resizeFromBuffer, resizeFromFile} from "../addons/image-processor";
import logger  from "../utils/logger";
import ImageMeta, {IImageMeta} from "../models/image-meta.model"

type TransformOptions = { w?: number; h?: number; format?: string; fit?: string };

const cacheKey = (publicId: string, o: TransformOptions) => {
    return `img:${publicId}:${o.w || 0}x${o.h || 0}:${o.format || "jpeg"}`;
}

const saveImageMetadata = async (publicId: string, key: string, mimeType: string, size: number): Promise<IImageMeta> => {
    const doc = new ImageMeta({
        publicId, 
        key, 
        mimeType,
        size,
    })
    await doc.save()
    return doc
}

const getTransformed = async (publicId: string, opts: TransformOptions) => {
    const key = cacheKey(publicId, opts);

    // cache hit
    const hit = await getBuffer(key);
    if (hit) {
        logger.info({ publicId, key }, "cache hit");
        return { buffer: hit, contentType: `image/${opts.format || "jpeg"}` };
    }

    // derived exists in storage?
    const dKey = storage.derivedKey(publicId, opts.w, opts.h, opts.format || "jpeg");
    if (await storage.exists(dKey)) {
        const buf = await storage.getObject(dKey);
        await setBuffer(key, buf);
        logger.info({ publicId, dKey }, "served derived from storage");
        return { buffer: buf, contentType: `image/${opts.format || "jpeg"}` };
    }

    // fetch original
    const origKey = `uploads/${publicId}`;
    const origBuf = await storage.getObject(origKey);

    if (!opts.w || !opts.h) throw new Error("Width and height are required");

    // process via addon
    const processed = await resizeFromBuffer(origBuf, opts.w, opts.h);

    // save derived back to storage and cache
    await storage.putObject(dKey, processed, `image/${opts.format || "jpeg"}`);
    await setBuffer(key, processed);

    logger.info({ publicId, dKey }, "processed and saved derived");

    return { buffer: processed, contentType: `image/${opts.format || "jpeg"}` };
}

export { getTransformed, saveImageMetadata }