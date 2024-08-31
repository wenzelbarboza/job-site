import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import z from "zod";
import { newUserProps } from "../models/user.models";
import { ApiError } from "../utils/apiError";

type newUserPropsType = z.infer<typeof newUserProps>;

export const newUser = asyncHandler(
  async (req: Request<any, any, newUserPropsType>, res: Response) => {
    try {
      // const zRes = newUserProps.parse(req.body);

      // console.log(zRes);

      return res.status(200).json({
        message: "Welcome, inside new user route1",
      });
    } catch (error) {
      throw error;
    }
  }
);
