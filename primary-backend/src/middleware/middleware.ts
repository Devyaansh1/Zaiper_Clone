import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASS } from "../config/config";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization as unknown as string;
  try {
    const payload = jwt.verify(token, JWT_PASS);
    // @ts-ignore
    req.id = payload.id;
    next();
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "you are not logged in",
    });
  }
}
