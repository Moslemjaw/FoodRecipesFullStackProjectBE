import express from "express";
import dotenv from "dotenv";
import userRouter from "./api/User/user.routers";
import errorHandling from "./middlewares/ErrorHandling";
import cors from "cors";
import { authorize } from "./middlewares/Authorize";
import motFoundHandler from "./middlewares/notFoundHandler";
import recipeRouter from "./api/Recipe/recipe.routers";
import ingredientRouter from "./api/Ingredient/ingredient.routers";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/users", authorize, userRouter);
app.use("/recipes", recipeRouter);
app.use("/ingredients", ingredientRouter);

app.use(motFoundHandler);
app.use(errorHandling);

app.listen([process.env.PORT], () => {
  console.log("Server is running..");
});
