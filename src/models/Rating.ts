import { model, Schema } from "mongoose";

const ratingSchema = new Schema(
  {
    userID: [{ type: Schema.Types.ObjectId, ref: "User" }],
    reciepeID: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
    rating: [{ type: Number, require: true, min: 1, max: 5 }],
  },
  { timestamps: true }
);

ratingSchema.index({ userID: 1, reciepeID: 1 }, { unique: true });
const Rating = model("Rating", ratingSchema);

export default Rating;
