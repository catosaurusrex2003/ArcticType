import z from "zod"

export const getTextSchema  = z.object({
    body:z.object({
        cat:z.string({
            invalid_type_error:"category can only be string",
            required_error:"category of the text is required"
        }),
        type:z.string({
            invalid_type_error:"type can only be string",
            required_error:"type of the text is required"
        }),
        length:z.number({
            invalid_type_error:"length can only be number",
            required_error:"length is required"
        })
    }).strict()
})