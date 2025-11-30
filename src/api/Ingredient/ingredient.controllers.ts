import { NextFunction, Request, Response } from "express";
import Ingredient from "../../models/Ingredient";

const addIngredient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const newIngredient = await Ingredient.create({ name });
    res.status(201).json("Ingredient created successfully");
  } catch (error) {
    next(error);
  }
};

export { addIngredient };
