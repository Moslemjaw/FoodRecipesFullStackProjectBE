//How much of this ingredient does this recipe use?

import { model, Schema } from "mongoose";

const recipeIngredietSchema = new Schema({
  recipe: { type: Schema.Types.ObjectId, ref: "Recipe", required: true },
  ingredient: {
    type: Schema.Types.ObjectId,
    ref: "Ingredient",
    required: true,
  },
  quantity: { type: String, required: true },
});

const RecipeIngredient = model("RecipeIngredient", recipeIngredietSchema);

export default RecipeIngredient;
