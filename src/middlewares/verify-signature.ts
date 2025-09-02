import { Request, Response, NextFunction } from "express";
import { verify } from "../utils/signer";

const verifySignature = (req: Request, res: Response, next: NextFunction) => {
    const { publicId } = req.params;
    const { w, h, format, sig } = req.query as any;

    const ok = verify(publicId, {
        w: w ? parseInt(w, 10) : undefined,
        h: h ? parseInt(h, 10) : undefined,
        format: format ? String(format) : undefined,
    }, sig);

    if (!ok) return res.status(403).json({ error: "Invalid signature" });
    next();
}

export default verifySignature