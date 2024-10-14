"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.signIn = exports.SignUp = void 0;
const types_1 = require("../types");
const db_1 = require("../config/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const SignUp = (req, res, Next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const parsedData = types_1.SignUpSchema.safeParse(body);
    if (!parsedData.success) {
        return Next(res.status(411).json({
            success: false,
            message: "Incorrect inputs",
        }));
    }
    const userExists = yield db_1.prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username,
        },
    });
    if (userExists) {
        res.status(403).json({
            success: false,
            message: "User already exists",
        });
    }
    yield db_1.prismaClient.user.create({
        data: {
            email: parsedData.data.username,
            password: parsedData.data.password,
            name: parsedData.data.name,
        },
    });
    res.status(201).json({
        success: true,
        message: "User created successfully",
    });
});
exports.SignUp = SignUp;
const signIn = (req, res, Next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const parsedData = types_1.SignInSchema.safeParse(body);
    if (!parsedData.success) {
        return Next(res.status(411).json({
            success: false,
            message: "Incorrect inputs",
        }));
    }
    const user = yield db_1.prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username,
            password: parsedData.data.password,
        },
    });
    if (user) {
        res.status(403).json({
            success: false,
            message: "Sorry credentials are incorrect",
        });
    }
    const token = jsonwebtoken_1.default.sign({
        id: user === null || user === void 0 ? void 0 : user.id,
    }, config_1.JWT_PASS);
    res.status(200).json({
        token: token,
    });
});
exports.signIn = signIn;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const id = req.id;
    const user = yield db_1.prismaClient.user.findFirst({
        where: {
            id: id,
        },
        select: {
            name: true,
            email: true,
        },
    });
    res.status(200).json({
        success: true,
        user,
    });
});
exports.getUser = getUser;
