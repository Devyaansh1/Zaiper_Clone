import express, { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/middleware";
import { getUser, signIn, SignUp } from "../controllers/user.controllers";

const userRouter = express.Router();

userRouter.post("/signup", SignUp);

userRouter.post("/signin", signIn);

userRouter.get("/", authMiddleware, getUser);

export default userRouter;
