import express from "express";
import { verifyUser } from "../utils/verifyUser";
import {
  createJob,
  getJobApplicaions,
  getJobs,
  getSingleJob,
  updateJobStatus,
  updateSaved,
} from "../controllers/jobs.controllers";

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
jobsRouter.post("/jobs/create-job", createJob);

export { jobsRouter };
