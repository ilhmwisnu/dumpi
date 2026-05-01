import type { Request, Response } from "express";
import mapValidationErrors from "../utils/validation_error_mapper";
import { loginForm, registerForm } from "../utils/validation";

const authController = {
  login: (req: Request, res: Response) => {
    const { email, password } = req.body;

    const result = loginForm.safeParse({ email, password });

    if (!result.success) {
      return res.status(400).json({
        message: "Login failed",
        error: mapValidationErrors(result.error.issues),
      });
    }

    res.json({
      message: "Login successful",
      token: "--token--",
    });
  },

  register: (req: Request, res: Response) => {
    const { email, password, confirmation_password } = req.body;

    const result = registerForm.safeParse({
      email,
      password,
      confirmation_password,
    });

    if (!result.success) {
      return res.status(400).json({
        message: "Registration failed",
        error: mapValidationErrors(result.error.issues),
      });
    }

    res.json({
      message: "Registration successful",
      token: "--token--",
    });
  },
};

export default authController;
