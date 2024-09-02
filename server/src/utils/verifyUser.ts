import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "./asyncHandler";
import { verifyAccessToken } from "./tokenUtils";
import { MyJwtPayload } from "./types";
import { ApiError } from "./apiError";

declare module "express-serve-static-core" {
  interface Request {
    user?: number; // Adjust the type as necessary
  }
}

export const verifyUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) throw new ApiError(401, "verification failed");

    try {
      const decoded = verifyAccessToken(token) as MyJwtPayload;

      req.user = decoded.userId;

      next();
    } catch (error) {
      throw error;
    }
  }
);
