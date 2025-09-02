import crypto from 'crypto';
import ENV from "./env";

type TransformParams = { w?: number; h?: number; format?: string; fit?: string }

const canonical = (publicId: string, q: TransformParams) => {
    const parts = [
        `id=${publicId}`,
        q.w ? `w=${q.w}` : '',
        q.h ? `h=${q.h}` : '',
        q.format ? `format=${q.format}` : '',
        q.fit ? `fit=${q.fit}` : '',
    ].filter(Boolean);

    return parts.sort().join('&');
}

const sign = (publicId: string, q: TransformParams) => {
    if (!ENV.SIGNING_SECRET) return '';
    return crypto
        .createHmac('sha256', ENV.SIGNING_SECRET)
        .update(canonical(publicId, q))
        .digest('hex');
}

const verify = (publicId: string, q: TransformParams, signature: string) => {
    if (!ENV.SIGNING_SECRET) return true;
    if (!signature) return false;
    return sign(publicId, q) === signature;
}

export { sign, verify, canonical }