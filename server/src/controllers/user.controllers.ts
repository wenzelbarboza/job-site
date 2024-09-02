import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import z from "zod";
import { loginProps, newUserProps } from "../models/user.models";
import { db } from "../db/db";
import { users } from "../db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/tokenUtils";
import { ApiError } from "../utils/apiError";
import { JwtPayload } from "jsonwebtoken";
import { MyJwtPayload } from "../utils/types";

type newUserPropsType = z.infer<typeof newUserProps>;

export const newUser = asyncHandler(
  async (req: Request<any, any, newUserPropsType>, res: Response) => {
    try {
      let zUser = newUserProps.parse(req.body);

      zUser.password = await bcrypt.hash(zUser.password, 10);

      console.log(zUser);

      const newUser = await db.insert(users).values(zUser).returning();

      console.log(newUser);

      return res.status(200).json({
        message: "Registration successfull",
      });
    } catch (error) {
      throw error;
    }
  }
);

type loginPropsType = z.infer<typeof newUserProps>;
export const login = asyncHandler(
  async (req: Request<any, any, loginPropsType>, res: Response) => {
    try {
      let { email, password } = loginProps.parse(req.body);
      const user = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (user.length === 0) throw new ApiError(400, "Invalid credentials");

      const validPassword = await bcrypt.compare(
        password,
        user[0].password as string
      );

      if (!validPassword) throw new ApiError(400, "Invalid credentials");

      const accessToken = generateAccessToken(user[0].id);
      const refreshToken = generateRefreshToken(user[0].id);

      await db
        .update(users)
        .set({ refreshToken })
        .where(eq(users.id, user[0].id));

      res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
      throw new ApiError(500, "Login failes");
    }
  }
);

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken: refreshTokenOld } = req.body;

  if (!refreshTokenOld) throw new ApiError(401, "invalid credentials");

  try {
    const decoded = verifyRefreshToken(refreshTokenOld) as MyJwtPayload;

    console.log("This is decoded refresh Token: ", decoded);

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, decoded.userId))
      .limit(1);

    if (user.length === 0 || user[0].refreshToken !== refreshTokenOld)
      throw new ApiError(400, "invalid refresh token");

    const accessToken = generateAccessToken(user[0].id);
    const refreshToken = generateRefreshToken(user[0].id);

    await db
      .update(users)
      .set({ refreshToken })
      .where(eq(users.id, user[0].id));

    return res.status(200).json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    throw error;
  }
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  try {
    const decoded = verifyRefreshToken(refreshToken) as MyJwtPayload;

    await db
      .update(users)
      .set({ refreshToken: null })
      .where(eq(users.id, decoded.userId));

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Logout failed" });
  }
});
