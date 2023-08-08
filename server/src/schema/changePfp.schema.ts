import z from "zod";

export const changePfpZodSchema = z.object({
    body: z.object({
        userEmail: z
            .string({
                invalid_type_error: "The email can only be string.",
                required_error: "The email cannot be empty.",
            })
            .email("The email is not valid."),
        picUrl: z
            .string({
                invalid_type_error: "The picUrl can only be string.",
                required_error: "The picUrl cannot be empty.",
            })
    }).strict()
});