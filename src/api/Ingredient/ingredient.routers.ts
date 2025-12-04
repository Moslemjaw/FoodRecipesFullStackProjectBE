import { Router } from "express";
import { authorize } from "../../middlewares/Authorize";
import {
  addIngredient,
  getAllIngredients,
  searchIngredients,
  deleteIngredient,
} from "./ingredient.controllers";

const ingredientRouter = Router();

ingredientRouter.post("/", authorize, addIngredient);
ingredientRouter.get("/", getAllIngredients);
ingredientRouter.get("/search", searchIngredients);
ingredientRouter.delete("/:id", authorize, deleteIngredient);
export default ingredientRouter;
