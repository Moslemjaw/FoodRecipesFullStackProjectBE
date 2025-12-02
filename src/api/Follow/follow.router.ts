import { Router } from "express";
import { authorize } from "../../middlewares/Authorize";
import {
  followUser,
  unfollowUser,
  getFollowing,
  getFollowers,
} from "./follow.controllers";

const followRouter = Router();

followRouter.get("/following", authorize, getFollowing);
followRouter.get("/followers", authorize, getFollowers);
followRouter.post("/:userID", authorize, followUser);
followRouter.delete("/:userID", authorize, unfollowUser);

export default followRouter;
