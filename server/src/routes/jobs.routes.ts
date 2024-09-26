import express from "express";
import { verifyUser } from "../utils/verifyUser";
import { getJobs, updateSaved } from "../controllers/jobs.controllers";

const jobsRouter = express.Router();
//api/v1/jobs/get-jobs
jobsRouter.post("/jobs/get-jobs", verifyUser, getJobs);
jobsRouter.post("/jobs/update-saved", verifyUser, updateSaved);

export { jobsRouter };
