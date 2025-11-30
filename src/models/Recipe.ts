import { model, Schema } from "mongoose";

const recipeSchema = new Schema({
  title: { type: String, require: true },
  instructions: { type: String, require: true },
  image: { type: String },
  cookingTime: { type: String },
  userId: { type: Schema.Types.ObjectId },
});

const Recipe = model("Recipe", recipeSchema);

export default Recipe;
