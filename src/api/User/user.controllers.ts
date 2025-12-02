import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(400).json("User already exists");
    } else {
      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALT)
      );
      let imagePath = "";
      if (req.file) {
        imagePath = req.file.path;
      }
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        image: imagePath,
      });
      const token = jwt.sign(
        { id: user._id.toString() },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "2h",
        }
      );
      res.status(201).json({
        message: "User created successfully",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json("Invalid Credentials");
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json("Invalid Credentials");
      } else {
        const token = jwt.sign(
          { id: user._id.toString() },
          process.env.JWT_SECRET as string,
          { expiresIn: "2h" }
        );
        res.status(200).json({
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            image: user.image,
          },
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export { register, login, getAllUser, getUserById };
