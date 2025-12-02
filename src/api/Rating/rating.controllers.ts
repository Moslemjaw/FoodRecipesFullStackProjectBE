import { NextFunction, Request, Response } from "express";
import Rating from "../../models/Rating";
import Recipe from "../../models/Recipe";
import { customRequestType } from "../../types/http";

const addRating = async (
  req: customRequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    const { recipeID, rating } = req.body;
    const userID = req.user?.id;

    const recipe = await Recipe.findById(recipeID);
    if (!recipe) {
      return res.status(404).json("Recipe not found");
    }

    const existingRating = await Rating.findOne({ userID, recipeID });
    if (existingRating) {
      return res.status(400).json("Rating already exists");
    }

    const newRating = await Rating.create({
      userID,
      recipeID,
      rating,
    });
    res.status(201).json(newRating);
  } catch (error) {
    next(error);
  }
};

const getRecipeRatings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { recipeId } = req.params;

    const ratings = await Rating.find({ recipeId }).populate(
      "userID",
      "name image"
    );

    const totalRatings = ratings.length;
    const averageRating =
      totalRatings > 0
        ? ratings.reduce((sum: number, r: any) => sum + r.rating, 0) /
          totalRatings
        : 0;

    res.status(200).json({
      ratings,
      totalRatings,
      averageRating: Math.round(averageRating * 10) / 10,
    });
  } catch (error) {
    next(error);
  }
};

const updateRating = async (
  req: customRequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;
    const userId = req.user?.id;

    const existingRating = await Rating.findById(id);
    if (!existingRating) {
      return res.status(404).json("Rating not found");
    }

    if (existingRating.userID.toString() !== userId) {
      return res.status(403).json("Not authorized to update this rating");
    }

    const updatedRating = await Rating.findByIdAndUpdate(
      id,
      { rating },
      { new: true }
    );

    res.status(200).json(updatedRating);
  } catch (error) {
    next(error);
  }
};

const deleteRating = async (
  req: customRequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const existingRating = await Rating.findById(id);
    if (!existingRating) {
      return res.status(404).json("Rating not found");
    }

    if (existingRating.userID.toString() !== userId) {
      return res.status(403).json("Not authorized to delete this rating");
    }

    await Rating.findByIdAndDelete(id);
    res.status(200).json({ message: "Rating deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export { addRating, getRecipeRatings, updateRating, deleteRating };
