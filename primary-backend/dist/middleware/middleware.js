"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
function authMiddleware(req, res, next) {
    const token = req.headers.authorization;
    try {
        const payload = jsonwebtoken_1.default.verify(token, config_1.JWT_PASS);
        // @ts-ignore
        req.id = payload.id;
        next();
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "you are not logged in",
        });
    }
}
exports.authMiddleware = authMiddleware;
