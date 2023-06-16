"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signRefreshToken = exports.signAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//signAccessToken fnc
function signAccessToken(res, id) {
    const PRIVATE_KEY = process.env.PRIVATE_KEY;
    const token = jsonwebtoken_1.default.sign({ id }, PRIVATE_KEY, { expiresIn: "1800s" });
    res.cookie("accessToken", token, {
        httpOnly: true,
        // maxAge: 20000, //20 sec
        maxAge: 3600000, // 1 hr
        // maxAge: 172800000, // 2days
    });
}
exports.signAccessToken = signAccessToken;
//signRefreshToken fnc
function signRefreshToken(res, id) {
    const PRIVATE_REFRESH_KEY = process.env.PRIVATE_REFRESH_KEY;
    const token = jsonwebtoken_1.default.sign({ id }, PRIVATE_REFRESH_KEY, { expiresIn: "1y", });
    res.cookie("refreshToken", token, {
        httpOnly: true,
        maxAge: 172800000, // 2days
        // secure: true,
    });
    return token;
}
exports.signRefreshToken = signRefreshToken;
// expiresIn: "1y"
