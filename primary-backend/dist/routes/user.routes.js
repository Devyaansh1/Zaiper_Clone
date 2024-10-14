"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware/middleware");
const user_controllers_1 = require("../controllers/user.controllers");
const userRouter = express_1.default.Router();
userRouter.post("/signup", user_controllers_1.SignUp);
userRouter.post("/signin", user_controllers_1.signIn);
userRouter.get("/user", middleware_1.authMiddleware, user_controllers_1.getUser);
exports.default = userRouter;
