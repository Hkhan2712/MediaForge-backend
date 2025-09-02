import path from 'path'
import fs from 'fs/promises'
import os from 'os'
import { randomUUID } from 'crypto'

const addonPath = path.resolve(__dirname, '../../../cpp_core/napi/build/Release/image_processor.node')
const native = require(addonPath) as {
    processImage: (inputPath: string, width: number, height: number) => Buffer
}

const resizeFromFile = async(inputPath: string, width: number, height: number): Promise<Buffer> => {
    return native.processImage(inputPath, width, height)
}

const resizeFromBuffer = async(buffer: Buffer, width: number, height: number): Promise<Buffer> => {
    const tmp = path.join(os.tmpdir(), `img-${randomUUID()}`)
    await fs.writeFile(tmp, buffer)
    try {
        return native.processImage(tmp, width, height)
    } finally {
        fs.unlink(tmp).catch(() => { /* ignore */ })
    }
}

export {resizeFromBuffer, resizeFromFile}
