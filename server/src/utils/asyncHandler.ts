import { NextFunction, Request, Response } from "express";
import { ApiError } from "./apiError";

type callBackType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const asyncHandler =
  (fn: callBackType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
      //@ts-ignore
      // res.status(err?.code || 500).json({
      //   success: false,
      //   //@ts-ignore
      //   message: err?.message || "some error occured",
      // });
    }
  };
