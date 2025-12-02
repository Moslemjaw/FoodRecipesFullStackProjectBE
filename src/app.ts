import express from "express";
import dotenv from "dotenv";
import userRouter from "./api/User/user.routers";
import errorHandling from "./middlewares/ErrorHandling";
import cors from "cors";
import { authorize } from "./middlewares/Authorize";
import notFoundHandler from "./middlewares/notFoundHandler";
import recipeRouter from "./api/Recipe/recipe.routers";
import ingredientRouter from "./api/Ingredient/ingredient.routers";
import morgan from "morgan";
import favoritesRouter from "./api/Favorites/favorites.router";
import ratingRouter from "./api/Rating/rating.routers";
import categoryRouter from "./api/Category/category.routers";
import connectDB from "./database";
import followRouter from "./api/Follow/follow.router";

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/users", authorize, userRouter);
app.use("/recipes", recipeRouter);
app.use("/ingredients", ingredientRouter);
app.use("/favorites", favoritesRouter);
app.use("/ratings", ratingRouter);
app.use("/categories", categoryRouter);
app.use("/follow", followRouter);

app.use(notFoundHandler);
app.use(errorHandling);

connectDB();
// const port = parseInt(process.env.PORT) || 8000;
app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running.. on port " + process.env.PORT);
});
