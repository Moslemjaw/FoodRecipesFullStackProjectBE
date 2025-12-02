import { Router } from "express";
import upload from "../../middlewares/Multer";
import {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  getMyRecipes,
  getRecipeByCategory,
  updateRecipe,
  deleteRecipe,
} from "./recipe.controllers";

const recipeRouter = Router();

recipeRouter.post("/", upload.single("image"), createRecipe);
recipeRouter.get("/", getAllRecipes);
recipeRouter.get("/:id", getRecipeById);
recipeRouter.get("/my-recipes", getMyRecipes);
recipeRouter.get("/category/:categoryId", getRecipeByCategory);
recipeRouter.put("/:id", upload.single("image"), updateRecipe);
recipeRouter.delete("/:id", deleteRecipe);
export default recipeRouter;
