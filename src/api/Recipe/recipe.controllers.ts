import { NextFunction, Request, Response } from "express";
import Recipe from "../../models/Recipe";
import User from "../../models/User";

const createRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, instructions, cookingTime } = req.body;
    const { userId } = req.params;

    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    let imagePath = "";

    if (req.file) {
      imagePath = req.file.path;
    }

    const newRecipe = await Recipe.create({
      title,
      instructions,
      image: imagePath,
      cookingTime,
      userId,
    });

    res.status(201).json(newRecipe);
  } catch (error) {
    next(error);
  }
};

export { createRecipe };
