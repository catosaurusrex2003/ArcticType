"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePfpZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.changePfpZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        userEmail: zod_1.default
            .string({
            invalid_type_error: "The email can only be string.",
            required_error: "The email cannot be empty.",
        })
            .email("The email is not valid."),
        picUrl: zod_1.default
            .string({
            invalid_type_error: "The picUrl can only be string.",
            required_error: "The picUrl cannot be empty.",
        })
    }).strict()
});
