import { Router } from "express";
import { login, register } from "./user.controllers";

const userRouter = Router();

userRouter.post("/", register);
userRouter.post("/login", login);

export default userRouter;
