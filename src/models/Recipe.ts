import { model, Schema } from "mongoose";

const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    instructions: [{ type: String, required: true }],
    image: { type: String },
    cookingTime: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    categoryId: [
      { type: Schema.Types.ObjectId, ref: "Category", require: true },
    ],
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
  },
  { timestamps: true }
);

const Recipe = model("Recipe", recipeSchema);

export default Recipe;
