//How much of this ingredient does this recipe use?

import { model, Schema } from "mongoose";

const recipeIngredietSchema = new Schema({
  recipe: { type: Schema.Types.ObjectId },
  ingredient: { type: Schema.Types.ObjectId },
  quantity: { type: String },
});

const RecipeIngredient = model("RecipeIngredient", recipeIngredietSchema);

export default RecipeIngredient;
