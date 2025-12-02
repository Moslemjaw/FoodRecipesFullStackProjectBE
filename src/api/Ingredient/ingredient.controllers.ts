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

const getAllIngredients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json(ingredients);
  } catch (error) {
    next(error);
  }
};

const searchIngredients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ message: "No ingredient found" });
    }
    const ingredients = await Ingredient.find({
      name: { $regex: name as string, $options: "i" },
    });
    res.status(200).json(ingredients);
  } catch (error) {
    next(error);
  }
};

const deleteIngredient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedIngredient = await Ingredient.findByIdAndDelete(id);
    if (!deletedIngredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }
    res.status(200).json({ message: "Ingredient deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export {
  addIngredient,
  getAllIngredients,
  searchIngredients,
  deleteIngredient,
};
