import { model, Schema } from "mongoose";

const favoritesSchema = new Schema(
  {
    userID: [{ type: Schema.Types.ObjectId, ref: "User" }],
    recipeID: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  },
  { timestamps: true }
);

favoritesSchema.index({ userID: 1, recipeID: 1 }, { unique: true });
const Favorites = model("Favorites", favoritesSchema);

export default Favorites;
