import { model, Schema } from "mongoose";

const recipeSchema = new Schema({
  title: { type: String, require: true },
  instructions: { type: String, require: true },
  image: { type: String },
  cookingTime: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  ingredients: [
    {
      ingredientId: {
        type: Schema.Types.ObjectId,
        ref: "Ingredient",
        required: true,
      },
      quantity: { type: String, required: true },
      unit: { type: String, required: true },
    },
  ],
});

const Recipe = model("Recipe", recipeSchema);

export default Recipe;
