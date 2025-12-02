import { Router } from "express";
import { authorize } from "../../middlewares/Authorize";
import {
  addRating,
  getRecipeRatings,
  updateRating,
  deleteRating,
} from "./rating.controllers";

const ratingRouter = Router();

ratingRouter.post("/", authorize, addRating);
ratingRouter.get("/recipe/:recipeID", getRecipeRatings);
ratingRouter.put("/:ratingID", authorize, updateRating);
ratingRouter.delete("/:ratingID", authorize, deleteRating);

export default ratingRouter;
