import { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user?: number;
  }
}

export type MyJwtPayload = JwtPayload & {
  userId: number;
};
