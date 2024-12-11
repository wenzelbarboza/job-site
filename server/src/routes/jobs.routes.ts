import express from "express";
import { verifyUser } from "../utils/verifyUser";
import {
  createJob,
  deleteJob,
  getCreatedJobs,
  getJobApplicaions,
  getJobs,
  getSavedJobs,
  getSingleJob,
  updateJobStatus,
  updateSaved,
} from "../controllers/jobs.controllers";
import { upload } from "../utils/multer";

// TODO
// check for verified routes
// might have missed to apply verification to route due to local testing

const jobsRouter = express.Router();
//api/v1/jobs/get-jobs
jobsRouter.post("/jobs/get-jobs", verifyUser, getJobs);
jobsRouter.post("/jobs/update-saved", verifyUser, updateSaved);
jobsRouter.post("/jobs/get-job-applications", verifyUser, getJobApplicaions);
jobsRouter.post("/jobs/get-job", verifyUser, getSingleJob);
jobsRouter.post("/jobs/update-status", verifyUser, updateJobStatus);
jobsRouter.post("/jobs/create-job", verifyUser, createJob);
jobsRouter.post("/jobs/get-saved", verifyUser, getSavedJobs);
jobsRouter.post("/jobs/get-created-jobs", verifyUser, getCreatedJobs);
jobsRouter.post("/jobs/delete-job", verifyUser, deleteJob);

export { jobsRouter };
