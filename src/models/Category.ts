import { model, Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, require: true },
    recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  },
  { timestamps: true }
);

const Category = model("Category", categorySchema);

export default Category;
