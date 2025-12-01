import { model, Schema } from "mongoose";

const ratingSchema = new Schema(
  {
    userID: [{ type: Schema.Types.ObjectId, ref: "User" }],
    reciepeID: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
    rating: [{ type: Number, require: true }],
  },
  { timestamps: true }
);

const Rating = model("Rating", ratingSchema);

export default Rating;
