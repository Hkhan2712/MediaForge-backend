// lightweight controller to expose both presigned and direct serve
import { Request, Response, NextFunction } from "express";
import createUploadUrl from "./upload-controller";
import serveTransformed from "./cdn-controller";

export { createUploadUrl, serveTransformed }