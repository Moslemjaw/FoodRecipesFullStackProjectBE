import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    image: { type: String },
    recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
