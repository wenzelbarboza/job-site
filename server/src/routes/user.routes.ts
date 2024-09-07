import express from "express";
import {
  login,
  logout,
  refresh,
  setRole,
  signUp,
} from "../controllers/user.controllers";
import { verifyUser } from "../utils/verifyUser";

const userRouter = express.Router();
//api/v1/user/new
userRouter.post("/user/signup", signUp);
userRouter.post("/user/login", login);
userRouter.post("/user/refresh", refresh);
userRouter.post("/user/logout", logout);
userRouter.post("/user/role", setRole);

export { userRouter };
