import { JwtPayload } from "jsonwebtoken";
import { refreshType } from "../models/user.models";
import { z } from "zod";

declare module "express-serve-static-core" {
  interface Request {
    user?: number;
  }
}

export type MyJwtPayload = JwtPayload & {
  userId: number;
};

export enum roleEnum {
  candidate = "candidate",
  recruiter = "recruiter",
}

export type refreshProps = z.infer<typeof refreshType>;
