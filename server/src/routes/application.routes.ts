import express from "express";
import { verifyUser } from "../utils/verifyUser";
import { upload } from "../utils/multer";
import {
  applyJob,
  getApplications,
  updateStatus,
} from "../controllers/application.controllers";

const applicationRoute = express.Router();
applicationRoute.post(
  "/application/apply",
  verifyUser,
  // upload.none(),
  upload.any(),

  applyJob
);
applicationRoute.post(
  "/application/get-applications",
  // verifyUser,
  getApplications
);
applicationRoute.post("/application/update-status", updateStatus);

export { applicationRoute };
