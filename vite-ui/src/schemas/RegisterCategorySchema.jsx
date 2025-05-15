import { z } from "zod";

export const RegisterCategorySchema = z.object({
  name: z
    .string()
    .min(3, { message: "Title must be atleast 3 character long" })
    .max(100, { message: "Title cannot exeed more than 100 characters" })
    });