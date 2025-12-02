import { model, Schema } from "mongoose";

const ingredientSchema = new Schema({
  name: { type: String, require: true },
});

const Ingredient = model("Ingredient", ingredientSchema);

export default Ingredient;
