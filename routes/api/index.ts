import authController from "../../controller/auth";
import profileRoute from "./profile";
import userRoute from "./user";
import { Router } from "express";

const apiRoute = Router();

apiRoute.use("/users", userRoute);
apiRoute.use("/profile", profileRoute);
apiRoute.post("/login", authController.login);
apiRoute.post("/register", authController.register);

export default apiRoute;
