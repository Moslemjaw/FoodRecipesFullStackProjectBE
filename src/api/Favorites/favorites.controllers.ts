import { NextFunction, Response } from "express";
import Favorites from "../../models/Favorites";
import Recipe from "../../models/Recipe";
import { customRequestType } from "../../types/http";

const addFavorite = async (
  req: customRequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    const { recipeID } = req.body;
    const userID = req.user?.id;

    const recipe = await Recipe.findById(recipeID);
    if (!recipe) {
      return res.status(404).json("Recipe not found");
    }

    const existingFavorite = await Favorites.findOne({ userID, recipeID });
    if (existingFavorite) {
      return res.status(400).json("Recipe already in favorites");
    }

    const favorites = await Favorites.create({ userID, recipeID });
    res.status(201).json(favorites);
  } catch (error) {
    next(error);
  }
};

const getMyFavorites = async (
  req: customRequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    const userID = req.user?.id;

    const favorites = await Favorites.find({ userID }).populate({
      path: "recipeID",
      populate: [
        { path: "userId", select: "name image" },
        { path: "categoryId", select: "name" },
      ],
    });

    res.status(200).json(favorites);
  } catch (error) {
    next(error);
  }
};

const removeFavorite = async (
  req: customRequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    const { recipeID } = req.params;
    const userID = req.user?.id;

    const favorite = await Favorites.findOne({ userID, recipeID });
    if (!favorite) {
      return res.status(404).json("Favorite not found");
    }

    await Favorites.findByIdAndDelete(favorite._id);
    res.status(200).json("Removed from favorites");
  } catch (error) {
    next(error);
  }
};

export { addFavorite, getMyFavorites, removeFavorite };
