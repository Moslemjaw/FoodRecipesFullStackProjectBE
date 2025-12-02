import { model, Schema } from "mongoose";

const ratingSchema = new Schema(
  {
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    recipeID: { type: Schema.Types.ObjectId, ref: "Recipe", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true }
);

ratingSchema.index({ userID: 1, recipeID: 1 }, { unique: true });

const Rating = model("Rating", ratingSchema);

export default Rating;
