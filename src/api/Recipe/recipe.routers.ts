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
import { authorize } from "../../middlewares/Authorize";
const recipeRouter = Router();

recipeRouter.get("/", authorize, getAllRecipes);
recipeRouter.get("/my-recipes", getMyRecipes);
recipeRouter.get("/category/:categoryId", getRecipeByCategory);

recipeRouter.get("/:id", getRecipeById);
recipeRouter.post("/", upload.single("image"), createRecipe);
recipeRouter.put("/:id", upload.single("image"), updateRecipe);
recipeRouter.delete("/:id", authorize, deleteRecipe);
export default recipeRouter;
