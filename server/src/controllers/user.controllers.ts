import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import z from "zod";
import { newUserProps } from "../models/user.models";
import { ApiError } from "../utils/apiError";
import { db } from "../db/db";
import { users } from "../db/schema";

type newUserPropsType = z.infer<typeof newUserProps>;

export const newUser = asyncHandler(
  async (req: Request<any, any, newUserPropsType>, res: Response) => {
    try {
      const zRes = newUserProps.parse(req.body);

      console.log(zRes);

      const newUser = await db.insert(users).values(zRes).returning();

      console.log(newUser);

      return res.status(200).json({
        message: "new user created",
      });
    } catch (error) {
      throw error;
    }
  }
);
