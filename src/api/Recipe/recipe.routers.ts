import { Router } from "express";
import upload from "../../middlewares/Multer";
import { createRecipe } from "./recipe.controllers";

const recipeRouter = Router();

recipeRouter.post("/", upload.single("image"), createRecipe);

export default recipeRouter;
