import express from "express";
import { verifyUser } from "../utils/verifyUser";
import { upload } from "../utils/multer";
import {
  applyJob,
  getApplicantApplications,
  getApplications,
  updateStatus,
} from "../controllers/application.controllers";

const applicationRoute = express.Router();
applicationRoute.post(
  "/application/apply",
  upload.any(),
  verifyUser,
  // upload.none(),

  applyJob
);
applicationRoute.post(
  "/application/get-applications",
  // verifyUser,
  getApplications
);
applicationRoute.post("/application/update-status", updateStatus);

applicationRoute.post(
  "/application/user-application",
  verifyUser,
  getApplicantApplications
);

export { applicationRoute };
