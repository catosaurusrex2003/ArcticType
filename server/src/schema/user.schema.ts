import z from "zod";
import { userType } from "../models/user.model";

export const CreateUserZodSchema = z.object({
  body: z
    .object({
      username: z.string({
        invalid_type_error: "The username can only be string.",
        required_error: "The username cannot be empty.", 
      }).min(5),
      email: z.string({
          invalid_type_error: "The email can only be string.",
          required_error: "The email cannot be empty.",
        })
        .email("The email is not valid."),
      password: z.string({
        invalid_type_error: "The password can only be string.",
        required_error: "The password cannot be empty.",
      }),
    })
    .strict(),
});

export const LoginUserZodSchema = z.object({
  body: z
    .object({
      email: z
        .string({
          invalid_type_error: "The email can only be string.",
          required_error: "The email cannot be empty.",
        })
        .email("The email is not valid."),

      password: z.string({
        invalid_type_error: "The password can only be string.",
        required_error: "The password cannot be empty.",
      }),
    })
    .strict(), // throws error if there is any unknown keys in the input
});

//type
export type CreateUserReqType = {
  body: Pick<userType, "username" | "email" | "password">;
};

export type LoginUserReqType = {
  body: Pick<userType, "email" | "password">;
};

// type createUserType = z.infer<typeof CreateUserZodSchema>
