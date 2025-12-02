import { Router } from "express";
import { login, register } from "./user.controllers";
import upload from "../../middlewares/Multer";
const userRouter = Router();

userRouter.post("/register", upload.single("image"), register);
userRouter.post("/login", login);

export default userRouter;
