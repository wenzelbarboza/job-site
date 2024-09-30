import { Request, Response } from "express";
import { db } from "../db/db";
import { companies } from "../db/schema";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError";

export const getCompanies = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const companieList = await db.select().from(companies);

      return res.status(200).json({
        success: true,
        message: "Companies fetched successfully",
        data: companieList,
      });
    } catch (error: any) {
      throw new ApiError(400, error.message);
    }
  }
);
