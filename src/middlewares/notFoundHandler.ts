import { NextFunction, Request, Response } from "express";

const motFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(404).json({ message: "Route not found" });
  } catch (error) {
    next(error);
  }
};
export default motFoundHandler;
