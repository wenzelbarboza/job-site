import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";

const app = express();

const port = 5001;

app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

//routes imports
import { userRouter } from "./routes/user.routes";
import { globalCatch } from "./utils/globalCatch";
import { asyncHandler } from "./utils/asyncHandler";

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "welcome to JungleJobs backend",
  });
});

app.use("/api/v1", userRouter);

//global catch
app.use(globalCatch);

app.listen(port, () => {
  console.log("listning on port", port);
});
