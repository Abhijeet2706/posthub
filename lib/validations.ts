import * as z from "zod";

export const postFormSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters" })
    .max(100, { message: "Title must not exceed 100 characters" }),
  body: z
    .string()
    .min(10, { message: "Content must be at least 10 characters" })
    .max(500, { message: "Content must not exceed 500 characters" }),
  userId: z.number().int().positive(),
});