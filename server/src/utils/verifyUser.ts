import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "./asyncHandler";
import { verifyAccessToken } from "./tokenUtils";
import { MyJwtPayload } from "./types";
import { ApiError } from "./apiError";

export const verifyUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    console.log("------------------------------------------");
    console.log("** debugging for if authHeader exists **");
    console.log("headers: ", req.headers);
    console.log("authHeader: ", authHeader);
    console.log("------------------------------------------");

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      console.log("------------------------------------------");
      console.log("** debugging for if token exists **");
      console.log("no token received");
      console.log("------------------------------------------");
      throw new ApiError(401, "verification failed");
    }

    try {
      const decoded = verifyAccessToken(token) as MyJwtPayload;

      req.user = decoded.userId;

      next();
    } catch (error) {
      throw error;
    }
  }
);
