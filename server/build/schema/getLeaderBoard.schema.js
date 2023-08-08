"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getleaderBoardZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
// const categoryValues: number[] = [15, 30, 60, 120];
// const categoryValidator: z.ZodType<keyof typeof categoryValues> = z
//     .number()
//     .refine((value) => categoryValues.includes(value), {
//         message: `Invalid category. Allowed values are: ${categoryValues.join(', ')}`,
//     });
exports.getleaderBoardZodSchema = zod_1.default.object({
    query: zod_1.default.object({
        category: zod_1.default.string({
            // invalid_type_error: "Category can only be number.",
            required_error: "Category cannot be empty.",
        }),
        pageNumber: zod_1.default.string({
            // invalid_type_error: "PageNumber can only be number.",
            required_error: "PageNumber cannot be empty.",
        }),
        perPage: zod_1.default.string({
            // invalid_type_error: "perPage can only be number.",
            required_error: "perPage cannot be empty.",
        })
    }).strict()
});
