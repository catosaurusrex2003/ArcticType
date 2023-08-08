"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewTestZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.NewTestZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        userEmail: zod_1.default
            .string({
            invalid_type_error: "The email can only be string.",
            required_error: "The email cannot be empty.",
        })
            .email("The email is not valid."),
        userName: zod_1.default
            .string({
            invalid_type_error: "The username can only be string.",
            required_error: "The username cannot be empty.",
        }),
        stats: zod_1.default.object({
            time: zod_1.default.literal(15).or(zod_1.default.literal(30)).or(zod_1.default.literal(60)).or(zod_1.default.literal(120)),
            wpm: zod_1.default.number({
                invalid_type_error: "The wpm can only be number.",
                required_error: "wpm is required.",
            }),
            acc: zod_1.default.number({
                invalid_type_error: "The wpm can only be number.",
                required_error: "acc is required.",
            }),
            type: zod_1.default.literal("basic").or(zod_1.default.literal("punc")).or(zod_1.default.literal("num")).or(zod_1.default.literal("both")),
            retest: zod_1.default.boolean({
                invalid_type_error: "The retest can only be boolean.",
                required_error: "retest is required.",
            })
        })
    }).strict()
});
