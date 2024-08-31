import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
// app.use(express.static("public"));

//routes imports
import { userRouter } from "./routes/user.routes";
import { globalCatch } from "./utils/globalCatch";

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "welcome to JungleJobs backend",
  });
});

app.use("/api/v1", userRouter);

//global catch
app.use(globalCatch);

app.listen(3003, () => console.log("Server ready on port 3003."));

export default app;
