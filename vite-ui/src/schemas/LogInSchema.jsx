import { z } from "zod";

export const LogInSchema = z
  .object({
    username: z
      .string()
      .min(4, { message: "Username must be atleast 4 characters long" })
      .max(100, {
        message: "Username cannot be longer than 100 characters long",
      })
      .refine((val) => val.trim() !== "", {
        message: "Username cannot be blank",
      }),
    password: z
      .string()
      .min(8, { message: "Password must be atleast 8 characters long" })
      .max(255, {
        message: "Password cannot be longer than 255 characters long",
      })
      .refine((val) => val.trim() !== "", {
        message: "Password cannot be blank",
      })
  })
 