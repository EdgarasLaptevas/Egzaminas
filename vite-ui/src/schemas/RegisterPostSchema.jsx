import { z } from "zod";

export const RegisterPostSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be atleast 3 character long" })
    .max(100, { message: "Title cannot exeed more than 100 characters" }),
    postType: z.string(),
  content: z
    .string()
    .min(10, { message: "Content must be atleast 10 character long" })
    .max(2000, { message: "Content cannot exeed more than 2000 characters" }),
  price: z.number().positive({ message: "Price must be Positive number" }),
  town: z
    .string()
    .min(3, { message: "Town must be atleast 3 character long" })
    .max(100, { message: "Town cannot exeed more than 100 characters" }),
});
