import { model, Schema } from "mongoose";

const ingredientSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const Ingredient = model("Ingredient", ingredientSchema);

export default Ingredient;
