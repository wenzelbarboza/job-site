import express from "express";
import {
  login,
  logout,
  newUser,
  refresh,
} from "../controllers/user.controllers";
import { verifyUser } from "../utils/verifyUser";

const userRouter = express.Router();
//api/v1/user/new
userRouter.post("/user/new", newUser);
userRouter.post("/user/login", login);
userRouter.post("/user/refresh", refresh);
userRouter.post("/user/logout", logout);

export { userRouter };
