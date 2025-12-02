import { NextFunction, Response } from "express";
import Follow from "../../models/Follow";
import User from "../../models/User";
import { customRequestType } from "../../types/http";

const followUser = async (
  req: customRequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userID } = req.params;
    const followerID = req.user?.id;

    if (userID === followerID) {
      return res.status(400).json("You cannot follow yourself");
    }

    const userToFollow = await User.findById(userID);
    if (!userToFollow) {
      return res.status(404).json("User not found");
    }

    const existingFollow = await Follow.findOne({
      followerID,
      followingID: userID,
    });
    if (existingFollow) {
      return res.status(400).json("Already following this user");
    }

    const follow = await Follow.create({
      followerID,
      followingID: userID,
    });

    res.status(201).json(follow);
  } catch (error) {
    next(error);
  }
};

const unfollowUser = async (
  req: customRequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userID } = req.params;
    const followerID = req.user?.id;

    const follow = await Follow.findOne({
      followerID,
      followingID: userID,
    });

    if (!follow) {
      return res.status(404).json("You are not following this user");
    }

    await Follow.findByIdAndDelete(follow._id);
    res.status(200).json("Unfollowed successfully");
  } catch (error) {
    next(error);
  }
};

const getFollowing = async (
  req: customRequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    const followerID = req.user?.id;

    const following = await Follow.find({ followerID }).populate(
      "followingID",
      "name image"
    );

    res.status(200).json(following);
  } catch (error) {
    next(error);
  }
};

const getFollowers = async (
  req: customRequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    const followingID = req.user?.id;

    const followers = await Follow.find({ followingID }).populate(
      "followerID",
      "name image"
    );

    res.status(200).json(followers);
  } catch (error) {
    next(error);
  }
};

export { followUser, unfollowUser, getFollowing, getFollowers };
