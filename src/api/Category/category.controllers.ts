import { NextFunction, Request, Response } from "express";
import Category from "../../models/Category";
import { customRequestType } from "../../types/http";
import upload from "../../middlewares/Multer";

const createCategory = async (
  req: customRequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json("Category already exists");
    }

    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};
const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json("Category not found");
    }

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (
  req: customRequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json("Category not found");
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (
  req: customRequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json("Category not found");
    }

    await Category.findByIdAndDelete(id);
    res.status(200).json("Category deleted successfully");
  } catch (error) {
    next(error);
  }
};

export {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
