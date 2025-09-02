import { Request, Response, NextFunction } from "express";
import * as imageService from "../services/image-service";

const serveTransformed = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { publicId } = req.params;
        const { w, h, format } = req.query as any;

        const opts = {
        w: w ? parseInt(w, 10) : undefined,
        h: h ? parseInt(h, 10) : undefined,
        format: format ? String(format) : "jpeg",
        };

        const out = await imageService.getTransformed(publicId, opts);

        res.setHeader("Content-Type", out.contentType);
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        res.send(out.buffer);
    } catch (e) {
        next(e);
    }
}

export default serveTransformed