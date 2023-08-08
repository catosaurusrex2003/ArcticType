import z from "zod";

// const categoryValues: number[] = [15, 30, 60, 120];

// const categoryValidator: z.ZodType<keyof typeof categoryValues> = z
//     .number()
//     .refine((value) => categoryValues.includes(value), {
//         message: `Invalid category. Allowed values are: ${categoryValues.join(', ')}`,
//     });




export const getleaderBoardZodSchema = z.object({
    query: z.object({
        category: z.string({
            // invalid_type_error: "Category can only be number.",
            required_error: "Category cannot be empty.",
        }),
        pageNumber: z.string({
            // invalid_type_error: "PageNumber can only be number.",
            required_error: "PageNumber cannot be empty.",
        }),
        perPage: z.string({
            // invalid_type_error: "perPage can only be number.",
            required_error: "perPage cannot be empty.",
        })
    }).strict()
});