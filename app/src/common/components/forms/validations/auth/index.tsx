import { z } from "zod/v4";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const passwordMessage =
  "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
const confirmPasswordMessage =
  "Confirm password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";

export const signInSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password must be less than 50 characters long" })
    .regex(passwordRegex, { message: passwordMessage }),
});

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .max(50, { message: "Name must be less than 50 characters long" }),
    email: z.email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(50, { message: "Password must be less than 50 characters long" })
      .regex(passwordRegex, {
        message: passwordMessage,
      }),

    confirmPassword: z
      .string()
      .min(8, {
        message: "Confirm password must be at least 8 characters long",
      })
      .max(50, {
        message: "Confirm password must be less than 50 characters long",
      })
      .regex(passwordRegex, {
        message: confirmPasswordMessage,
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignInSchema = z.infer<typeof signInSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;
