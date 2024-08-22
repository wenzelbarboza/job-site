import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError";

export const newUser = asyncHandler(async (req: Request, res: Response) => {
  // throw new ApiError(200, "api errororo 11111V");
  return res.status(200).json({
    message: "Welcome, inside new user route",
  });
});
