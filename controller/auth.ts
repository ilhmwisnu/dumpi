import type { Request, Response } from "express";
import mapValidationErrors from "../utills/validation_error_mapper";
import { loginForm, registerForm } from "../utills/validation";

const authController = {
  login: (req: Request, res: Response) => {
    try {
      let { email, password } = req.body;

      let result = loginForm.safeParse({ email, password });

      if (!result.success) {
        return res.status(400).json({
          message: "Login gagal",
          error: mapValidationErrors(result.error.issues),
        });
      }

      res.json({
        message: "Login berhasil",
        token: "--token--",
      });
    } catch (error) {
      res.status(500);
    }
  },

  register : (req: Request, res: Response) =>{
    try {
      let { email, password, confirmation_password } = req.body
      
      const result = registerForm.safeParse({
        email, password, confirmation_password
      })

      if (!result.success) {
        return res.status(400).json({
          message : "Registrasi gagal",
          error : mapValidationErrors(result.error.issues)
        })
      }

      res.json({
        message : "Registrasi berhasil",
        token : "--token--"
      })
    } catch (error) {
      res.status(500)
    }
  }
};

export default authController;
