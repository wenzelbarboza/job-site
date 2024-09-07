import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-secret";
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-secret";

type accessTokenType = {
  userId: number;
  name: string;
  role: string | null;
};
export function generateAccessToken({ userId, name, role }: accessTokenType) {
  console.log(userId, name, role);
  return jwt.sign({ userId, name, role }, accessTokenSecret, {
    expiresIn: "15m",
  });
}

export function generateRefreshToken(userId: number) {
  return jwt.sign({ userId }, refreshTokenSecret, { expiresIn: "7d" });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, accessTokenSecret);
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, refreshTokenSecret);
}
