import z from "zod";

export const NewTestZodSchema = z.object({
  body: z.object({
    userEmail: z
      .string({
        invalid_type_error: "The email can only be string.",
        required_error: "The email cannot be empty.",
      })
      .email("The email is not valid."),
    userName: z
      .string({
        invalid_type_error: "The username can only be string.",
        required_error: "The username cannot be empty.",
      }),
    stats: z.object({
        time: z.literal(15).or(z.literal(30)).or(z.literal(60)).or(z.literal(120)),
        wpm: z.number({
          invalid_type_error: "The wpm can only be number.",
          required_error: "wpm is required.",
        }),
        acc: z.number({
          invalid_type_error: "The wpm can only be number.",
          required_error: "acc is required.",
        }),
        type: z.literal("basic").or(z.literal("punc")).or(z.literal("num")).or(z.literal("both")),
        retest: z.boolean({
          invalid_type_error: "The retest can only be boolean.",
          required_error: "retest is required.",
        })
      })
  }).strict()
});