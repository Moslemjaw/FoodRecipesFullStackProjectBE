import { NextFunction, Request, Response } from "express";

const errorHandling = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.status).json(err);
};

export default errorHandling;
