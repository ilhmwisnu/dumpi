import { Router } from "express";
import profileController from "../../controller/profile";

const profileRoute = Router();

profileRoute.get("/", profileController.getProfile);

export default profileRoute;
