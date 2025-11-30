import { Router } from "express";
import { addIngredient } from "./ingredient.controllers";

const ingredientRouter = Router();

ingredientRouter.post("/", addIngredient);

export default ingredientRouter;
