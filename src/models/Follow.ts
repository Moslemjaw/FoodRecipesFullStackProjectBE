import { model, Schema } from "mongoose";

const followSchema = new Schema(
  {
    followerID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    followingID: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

followSchema.index({ followerID: 1, followingID: 1 }, { unique: true });

const Follow = model("Follow", followSchema);

export default Follow;
