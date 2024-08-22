import { NextFunction, Request, Response } from "express";
import { ApiError } from "./apiError.js";

export const globalCatch = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const message = err.message;
  const status = err.status || 400;
  return res.status(status).json({
    success: false,
    message,
  });
};
