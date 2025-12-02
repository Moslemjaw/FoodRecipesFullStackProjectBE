import { Router } from "express";
import { authorize } from "../../middlewares/Authorize";
import {
  addFavorite,
  getMyFavorites,
  removeFavorite,
} from "./favorites.controllers";

const favoritesRouter = Router();

favoritesRouter.post("/", authorize, addFavorite);
favoritesRouter.get("/", authorize, getMyFavorites);
favoritesRouter.delete("/:recipeID", authorize, removeFavorite);

export default favoritesRouter;
