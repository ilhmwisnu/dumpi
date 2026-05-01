import { Router } from "express";
import userController from "../../controller/user";

const userRoute = Router();

userRoute.get("/", userController.getAll);
userRoute.get("/:id", userController.getById);
userRoute.post("/", userController.create);
userRoute.put("/:id", userController.update);
userRoute.delete("/:id", userController.destroy);

export default userRoute;
