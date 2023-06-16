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
const user_model_1 = __importDefault(require("../models/user.model"));
const lodash_1 = __importDefault(require("lodash"));
function authenticateUser(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = new user_model_1.default();
        const userInstance = yield user.comparePasswords(payload.email, payload.password);
        let result = lodash_1.default.omit(JSON.parse(JSON.stringify(userInstance)), [
            "password",
        ]);
        return result;
    });
}
exports.default = authenticateUser;
