import getUserInfo from "../controllers/user.controllers.js";
import { Router } from "express";
import tokenValidation from "../middlewares/token.validation.js";

const userRouter = Router();

userRouter.get("/user/info", tokenValidation, getUserInfo);

export default userRouter;
