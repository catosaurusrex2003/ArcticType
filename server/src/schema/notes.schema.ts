import z from "zod";
import { noteType } from "../models/user.model";

export const AddNotesZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title cannot be empty",
      invalid_type_error: "Title should be a string value.",
    }),
    description: z.string().optional(),
  }),
});

export const RemoveNotesZodSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "Id cannot be empty",
      invalid_type_error: "Id should be a string value.",
    }),
  }),
});

//type
export type AddNoteType = { body: Pick<noteType, "title" | "description"> };
export type RemoveNoteType = { body: Pick<noteType, "_id"> };
