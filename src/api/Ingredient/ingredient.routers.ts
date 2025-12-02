import { Router } from "express";
import {
  addIngredient,
  getAllIngredients,
  searchIngredients,
  deleteIngredient,
} from "./ingredient.controllers";

const ingredientRouter = Router();

ingredientRouter.post("/", addIngredient);
ingredientRouter.get("/", getAllIngredients);
ingredientRouter.get("/search", searchIngredients);
ingredientRouter.delete("/:id", deleteIngredient);
export default ingredientRouter;
