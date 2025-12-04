import { NextFunction, Request, Response } from "express";
import Recipe from "../../models/Recipe";
import User from "../../models/User";
import { customRequestType } from "../../types/http";

const createRecipe = async (
  req: customRequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, instructions, cookingTime, categoryId } = req.body;
    const userId = req.user?.id;

    console.log("File received:", req.file);
    console.log("Body received:", req.body);

    let ingredients = req.body.ingredients;
    if (typeof ingredients === "string") {
      ingredients = JSON.parse(ingredients);
    }

    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    let imagePath = "";

    if (req.file) {
      imagePath = `/media/${req.file.filename}`;
    }

    const newRecipe = await Recipe.create({
      title,
      instructions,
      image: imagePath,
      cookingTime,
      userId,
      categoryId,
      ingredients,
    });

    res.status(201).json(newRecipe);
  } catch (error) {
    next(error);
  }
};

const getAllRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipes = await Recipe.find()
      .populate("userId", "name")
      .populate("categoryId", "name")
      .populate("ingredients.ingredientId", "name");
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};

const getRecipeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id)
      .populate("userId", "name")
      .populate("categoryId", "name")
      .populate("ingredients.ingredientId", "name");
    if (!recipe) {
      return res.status(404).json("Recipe not found");
    }
    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
};

const getMyRecipes = async (
  req: customRequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const recipes = await Recipe.find({ userId: userId })
      .populate("userId", "name")
      .populate("categoryId", "name")
      .populate("ingredients.ingredientId", "name");
    if (!recipes) {
      return res.status(404).json("No recipes found");
    }
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};

const getRecipeByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;
    const recipes = await Recipe.find({ categoryId: categoryId })
      .populate("userId", "name")
      .populate("categoryId", "name")
      .populate("ingredients.ingredientId", "name");
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};

const updateRecipe = async (
  req: customRequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userID = req.user?.id;
    const { title, instructions, cookingTime, categoryId } = req.body;

    // Parse ingredients - it comes as a string from FormData
    let ingredients = req.body.ingredients;
    if (typeof ingredients === "string") {
      ingredients = JSON.parse(ingredients);
    }

    const foundRecipe = await Recipe.findById(id);
    if (!foundRecipe) {
      return res.status(404).json("Recipe not found");
    }
    if (foundRecipe.userId.toString() !== userID) {
      return res.status(403).json("Unauthorized");
    }

    let imagePath = foundRecipe.image;
    if (req.file) {
      // Save the URL path, not file system path
      imagePath = `/media/${req.file.filename}`;
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      {
        title,
        instructions,
        image: imagePath,
        cookingTime,
        categoryId,
        ingredients,
      },
      { new: true }
    );
    res.status(200).json(updatedRecipe);
  } catch (error) {
    next(error);
  }
};

const deleteRecipe = async (
  req: customRequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userID = req.user?.id;
    const foundRecipe = await Recipe.findById(id);
    if (!foundRecipe) {
      return res.status(404).json("Recipe not found");
    }
    if (foundRecipe.userId.toString() !== userID) {
      return res.status(403).json("Unauthorized");
    }
    await Recipe.findByIdAndDelete(id);
    res.status(200).json("Recipe deleted successfully");
  } catch (error) {
    next(error);
  }
};

export {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  getMyRecipes,
  getRecipeByCategory,
  updateRecipe,
  deleteRecipe,
};
