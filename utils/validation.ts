import { z } from "zod";

const loginForm = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
  })
  .required();

const registerForm = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmation_password: z.string().min(8),
  })
  .required()
  .superRefine(({ confirmation_password, password }, ctx) => {
    if (confirmation_password !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmation_password"],
      });
    }
  });

export { loginForm, registerForm};
