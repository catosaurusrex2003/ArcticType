"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTextSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.getTextSchema = zod_1.default.object({
    body: zod_1.default.object({
        cat: zod_1.default.string({
            invalid_type_error: "category can only be string",
            required_error: "category of the text is required"
        }),
        type: zod_1.default.string({
            invalid_type_error: "type can only be string",
            required_error: "type of the text is required"
        }),
        length: zod_1.default.number({
            invalid_type_error: "length can only be number",
            required_error: "length is required"
        })
    }).strict()
});
