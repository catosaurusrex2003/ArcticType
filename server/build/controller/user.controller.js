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
exports.logoutUserHandler = exports.getUserHandler = exports.loginUserHandler = exports.createUserHandler = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const createUser_1 = __importDefault(require("../service/createUser"));
const authUser_1 = __importDefault(require("../service/authUser"));
const signToken_1 = require("../utils/signToken");
const getUserData_1 = __importDefault(require("../service/getUserData"));
function createUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userInstance = yield (0, createUser_1.default)(req.body);
            console.log("user created", userInstance);
            //Signing Jwts
            (0, signToken_1.signAccessToken)(res, userInstance.email);
            (0, signToken_1.signRefreshToken)(res, userInstance.email);
            res.status(200).json(userInstance);
        }
        catch (error) {
            logger_1.default.error(error);
            res.status(400).json({ name: error.name, message: error.message });
        }
    });
}
exports.createUserHandler = createUserHandler;
function loginUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userInstance = yield (0, authUser_1.default)(req.body);
            console.log("loggedin ", userInstance);
            //Signing Jwts
            (0, signToken_1.signAccessToken)(res, userInstance.email);
            const refreshToken = (0, signToken_1.signRefreshToken)(res, userInstance.email);
            //Creating a new session
            // await createSession(req,req.body.email,refreshToken)
            res.status(200).json(userInstance);
        }
        catch (error) {
            logger_1.default.error(error);
            res.status(400).json({ name: error.name, message: error.message });
        }
    });
}
exports.loginUserHandler = loginUserHandler;
function getUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //@ts-ignore
            const email = req.userEmail;
            const userInstance = yield (0, getUserData_1.default)(email);
            res.status(200).json(userInstance);
        }
        catch (error) {
            logger_1.default.error(error);
            res.status(400).json({ name: error.name, message: error.message });
        }
    });
}
exports.getUserHandler = getUserHandler;
function logoutUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Clearing Cookies
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            //Deleting Session
            //@ts-ignore
            // await deleteSession(req.userEmail);
            res.sendStatus(200);
        }
        catch (error) {
            logger_1.default.error(error);
            res.status(400).json({ name: error.name, message: error.message });
        }
    });
}
exports.logoutUserHandler = logoutUserHandler;
