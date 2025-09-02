import { Router } from "express";
import serveTransformed from "../controllers/cdn-controller"
import verifySignature from "../middlewares/verify-signature"

const router = Router()
// signed request recommended in prod: add verifySignature middleware
router.get("/:publicId", verifySignature, serveTransformed)
export default router