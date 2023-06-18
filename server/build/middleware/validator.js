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
exports.validateCookie = exports.validateRequest = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signToken_1 = require("../utils/signToken");
const logger_1 = __importDefault(require("../utils/logger"));
// Schema
// export const validateRequest = (schema: AnyZodObject) => 
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await schema.parseAsync({
//         body: req.body,
//         query: req.query,
//         params: req.params,
//       });
//       return next();
//     } catch (error) {
//       res.status(400).json(error);
//     }
//   };
function validateRequest(schema) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params
            });
            return next();
        }
        catch (error) {
            res.status(400).json(error);
        }
    });
}
exports.validateRequest = validateRequest;
// const PRIVATE_KEY = String(process.env.PRIVATE_KEY)
const PRIVATE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
// const PRIVATE_REFRESH_KEY = String(process.env.PRIVATE_REFRESH_KEY)
const PRIVATE_REFRESH_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
function validateCookie(req, res, next) {
    try {
        const { accessToken, refreshToken } = req.cookies;
        //Verify Access Token
        jsonwebtoken_1.default.verify(accessToken, PRIVATE_KEY, (error, decoded) => {
            if (!error) {
                const { id } = decoded;
                //@ts-ignore
                req.userEmail = id;
                return next();
            }
            else if ((error === null || error === void 0 ? void 0 : error.name) === "TokenExpiredError") {
                //Verify Refresh Token
                const { id } = jsonwebtoken_1.default.verify(refreshToken, PRIVATE_REFRESH_KEY);
                //Sign new cookies
                (0, signToken_1.signAccessToken)(res, id);
                (0, signToken_1.signRefreshToken)(res, id);
                logger_1.default.info("Tokens upadated");
                //@ts-ignore
                req.userEmail = id;
                return next();
            }
            else {
                console.log(error.message);
                throw error;
            }
        });
    }
    catch (error) {
        res.status(400).json({ name: error.name, message: error.message });
    }
}
exports.validateCookie = validateCookie;
