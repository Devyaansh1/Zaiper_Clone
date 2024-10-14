"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware/middleware");
const zapRouter = express_1.default.Router();
zapRouter.post("/", middleware_1.authMiddleware, (req, res) => { });
zapRouter.get("/", middleware_1.authMiddleware, (req, res) => { });
zapRouter.get("/:zapId", middleware_1.authMiddleware, (req, res) => { });
exports.default = zapRouter;
