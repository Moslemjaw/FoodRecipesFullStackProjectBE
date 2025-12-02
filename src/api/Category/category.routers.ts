import { Router } from "express";
import { authorize } from "../../middlewares/Authorize";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./category.controller";

const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.post("/", authorize, createCategory);
categoryRouter.put("/:id", authorize, updateCategory);
categoryRouter.delete("/:id", authorize, deleteCategory);

export default categoryRouter;
