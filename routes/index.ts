import authController from "../controller/auth";
import profileRoute from "./profile";
import userRoute from "./user";
import { Router } from "express";

const appRoute = Router()

appRoute.use("/users", userRoute)
appRoute.use("/profile", profileRoute)
appRoute.post("/login", authController.login)
appRoute.post("/register", authController.register)

export default appRoute