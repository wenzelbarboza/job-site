import express from "express";
import { verifyUser } from "../utils/verifyUser";
import { upload } from "../utils/multer";
import {
  applyJob,
  getApplications,
} from "../controllers/application.controllers";

const applicationRoute = express.Router();
applicationRoute.post(
  "/application/apply",
  verifyUser,
  upload.single("pdfFile"),
  applyJob
);
applicationRoute.post(
  "/application/get-applications",
  // verifyUser,
  getApplications
);

export { applicationRoute };
