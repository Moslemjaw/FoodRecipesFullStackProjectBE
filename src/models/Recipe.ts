import { model, Schema } from "mongoose";

const recipeSchema = new Schema(
  {
    title: { type: String, require: true },
    instructions: [{ type: String, require: true }],
    image: { type: String },
    cookingTime: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    categoryId: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    ingredients: [
      {
        ingredient: {
          type: Schema.Types.ObjectId,
          ref: "Ingredient",
          required: true,
        },
        quantity: { type: Number, required: true },
        unit: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Recipe = model("Recipe", recipeSchema);
