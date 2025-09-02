import { Router } from "express"
import uploads from "../controllers/upload-controller"

const router = Router();
router.post("/upload-url", uploads.createUploadUrl)
router.post("/callback", uploads.uploadCallback)

export default router