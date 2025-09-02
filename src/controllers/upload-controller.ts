import { Request, Response, NextFunction } from "express"
import logger from "../utils/logger"
import { saveImageMetadata } from "../services/image-service";

const createUploadUrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { mimeType } = req.body;
        if (!mimeType) {
            return res.status(400).json({error: "mimeType is required"})
        }

        const {uploadUrl, publicId} = await import("../services/storage-service").then(m => m.generateUploadUrl(mimeType))

        // TODO: persitst metadata (publicId, key, mimeType) to DB if you have one
        logger.info({publicId}, "presigned upload url generated")

        res.json({uploadUrl, publicId})
    } catch (e) {
        next(e)
    }
}

const uploadCallback = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { publicId, key, mimeType, size } = req.body
        if (!publicId || !key || !mimeType  || !size) return res.status(400).json({error: "Missing fields"})
        
        const meta = await saveImageMetadata(publicId, key, mimeType, size)
        res.json({success: true, data: meta})
    } catch (e) {
        next(e)
    }
}

export default {createUploadUrl, uploadCallback}