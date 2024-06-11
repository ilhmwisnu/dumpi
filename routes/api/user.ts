import { Router } from "express";
import userController from "../../controller/user";

const userRoute = Router();
userRoute.get("/", userController.getAll);
userRoute.get("/:id", userController.getById);

export default userRoute;
