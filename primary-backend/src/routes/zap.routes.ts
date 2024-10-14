import express, { Request, Response } from "express";
import { authMiddleware } from "../middleware/middleware";
import { getAllZap, zapCreate } from "../controllers/zap.controllers";

const zapRouter = express.Router();

zapRouter.post("/", authMiddleware, zapCreate);

zapRouter.get("/", authMiddleware, getAllZap);

zapRouter.get("/:zapId", authMiddleware, (req: Request, res: Response) => {});

export default zapRouter;
