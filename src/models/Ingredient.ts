import { model, Schema } from "mongoose";

const ingredentSchema = new Schema({
  name: { type: String, require: true },
});

const Ingredient = model("Ingredent", ingredentSchema);

export default Ingredient;
