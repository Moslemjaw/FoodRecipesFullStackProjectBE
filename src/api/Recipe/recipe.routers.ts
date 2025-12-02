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
recipeRouter.get("/my-recipes", authorize, getMyRecipes);
recipeRouter.get("/category/:categoryId", getRecipeByCategory);

recipeRouter.get("/:id", getRecipeById);
recipeRouter.post("/", authorize, upload.single("image"), createRecipe);
recipeRouter.put("/:id", authorize, upload.single("image"), updateRecipe);
recipeRouter.delete("/:id", authorize, deleteRecipe);
export default recipeRouter;
