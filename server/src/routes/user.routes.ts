import express from "express";
import { newUser } from "../controllers/user.controllers";

const userRouter = express.Router();
//api/v1/user/new
userRouter.get("/user/new", newUser);

export { userRouter };
