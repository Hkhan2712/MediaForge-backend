import mongoose, { Schema, Document } from "mongoose"

interface IImageMeta extends Document {
    publicId: string
    key: string
    mimeType: string 
    size: number
    width?: number
    height?: number
    format?: string
    createAt: Date
}

const ImageMetaSchema: Schema = new Schema<IImageMeta>(
    {
        publicId: { type: String, required: true, unique: true },
        key: { type: String, required: true },
        mimeType: { type: String, required: true },
        size: { type: Number, required: true },
        width: Number,
        height: Number,
        format: String,
    },
    { timestamps: { createdAt: true, updatedAt: false } }
)

export default mongoose.model<IImageMeta>("ImageMeta", ImageMetaSchema)