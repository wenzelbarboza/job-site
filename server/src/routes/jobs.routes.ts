import express from "express";
import { verifyUser } from "../utils/verifyUser";
import { getJobs } from "../controllers/jobs.controllers";

const jobsRouter = express.Router();
//api/v1/jobs/get-jobs
jobsRouter.post("/jobs/get-jobs", verifyUser, getJobs);

export { jobsRouter };
