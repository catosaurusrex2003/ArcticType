"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserZodSchema = exports.CreateUserZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.CreateUserZodSchema = zod_1.default.object({
    body: zod_1.default
        .object({
        username: zod_1.default.string({
            invalid_type_error: "The username can only be string.",
            required_error: "The username cannot be empty.",
        }).min(5),
        email: zod_1.default.string({
            invalid_type_error: "The email can only be string.",
            required_error: "The email cannot be empty.",
        })
            .email("The email is not valid."),
        password: zod_1.default.string({
            invalid_type_error: "The password can only be string.",
            required_error: "The password cannot be empty.",
        }),
    })
        .strict(),
});
exports.LoginUserZodSchema = zod_1.default.object({
    body: zod_1.default
        .object({
        email: zod_1.default
            .string({
            invalid_type_error: "The email can only be string.",
            required_error: "The email cannot be empty.",
        })
            .email("The email is not valid."),
        password: zod_1.default.string({
            invalid_type_error: "The password can only be string.",
            required_error: "The password cannot be empty.",
        }),
    })
        .strict(), // throws error if there is any unknown keys in the input
});
// type createUserType = z.infer<typeof CreateUserZodSchema>
