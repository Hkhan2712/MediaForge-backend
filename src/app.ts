import express from "express";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import uploadRoutes from "./routes/upload-routes";
import cdnRoutes from "./routes/cdn-routes";
import errorHandler from "./middlewares/error-handler";
import { requestLogger } from "./middlewares/request-logger";
import ENV from "./utils/env";

const app = express()

app.use(helmet())
app.use(compression())
app.use(express.json({ limit: "1mb" }))
app.use(requestLogger)
app.use(rateLimit({ windowMs: 60_000, max: 500 }))

app.get("/healthz", (_req, res) => res.json({ ok: true }))

app.use("/api", uploadRoutes)
app.use("/cdn", cdnRoutes)

app.use(errorHandler)

export default app