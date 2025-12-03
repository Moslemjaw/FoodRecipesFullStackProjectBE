import { NextFunction, Request, Response } from "express";
import Recipe from "../../models/Recipe";
import User from "../../models/User";
import { customRequestType } from "../../types/http";
import { Types } from "mongoose";

const createRecipe = async (
  req: customRequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, instructions, cookingTime, categoryId, ingredients } =
      req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Validate required fields
    if (!title || !cookingTime) {
      return res.status(400).json({
        message: "Title and cookingTime are required",
      });
    }

    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    let imagePath = "";

    if (req.file) {
      imagePath = req.file.path;
    }

    // Handle instructions - ensure it's an array
    let instructionsArray: string[] = [];
    if (instructions) {
      if (Array.isArray(instructions)) {
        instructionsArray = instructions;
      } else if (typeof instructions === "string") {
        instructionsArray = [instructions];
      }
    }

    // Handle categoryId - ensure it's an array of ObjectIds
    let categoryIdArray: Types.ObjectId[] = [];
    if (categoryId) {
      const categoryIds = Array.isArray(categoryId) ? categoryId : [categoryId];
      categoryIdArray = categoryIds.map((id) => new Types.ObjectId(id));
    }

    // Handle ingredients - parse if it's a JSON string and convert ingredientId to ObjectId
    let parsedIngredients: any[] = [];
    if (ingredients) {
      try {
        let ingredientsData: any[] = [];
        if (typeof ingredients === "string") {
          const parsed = JSON.parse(ingredients);
          ingredientsData = Array.isArray(parsed) ? parsed : [parsed];
        } else if (Array.isArray(ingredients)) {
          ingredientsData = ingredients;
        } else {
          ingredientsData = [ingredients];
        }

        // Convert ingredientId strings to ObjectId
        parsedIngredients = ingredientsData.map((ing) => ({
          ...ing,
          ingredientId: new Types.ObjectId(ing.ingredientId),
        }));
      } catch (parseError) {
        return res.status(400).json({
          message: "Invalid ingredients format. Expected JSON array.",
        });
      }
    }

    const newRecipe = await Recipe.create({
      title,
      instructions: instructionsArray,
      image: imagePath,
      cookingTime,
      userId: new Types.ObjectId(userId),
      categoryId: categoryIdArray,
      ingredients: parsedIngredients,
    });

    res.status(201).json(newRecipe);
  } catch (error: any) {
    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: Object.values(error.errors).map((e: any) => e.message),
      });
    }
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
    const { title, instructions, cookingTime, categoryId, ingredients } =
      req.body;
    const foundRecipe = await Recipe.findById(id);
    if (!foundRecipe) {
      return res.status(404).json("Recipe not found");
    }
    if (foundRecipe.userId.toString() !== userID) {
      return res.status(403).json("Unauthorized");
    }

    let imagePath = foundRecipe.image;
    if (req.file) {
      imagePath = req.file.path;
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
