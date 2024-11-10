import { Request, Response } from "express";
import { db } from "../db/db";
import { applications, companies, jobs, saved_jobs, users } from "../db/schema";
import { and, eq, ilike, like } from "drizzle-orm";
import { asyncHandler } from "../utils/asyncHandler";
import {
  getJobsSchema,
  getSingleJobSchema,
  UpdateJobStatusSchema,
} from "../models/user.models";
import { sql } from "drizzle-orm";
import { ApiError } from "../utils/apiError";
import { z, ZodPipeline } from "zod";
import { roleEnum } from "../utils/types";

type getJobs = {
  location: string;
  company_id: string;
  searchQuery: string;
};

export const getJobs = asyncHandler(
  async (req: Request<any, any, getJobs>, res: Response) => {
    try {
      const { location, company_id, searchQuery } = getJobsSchema.parse(
        req.body
      );

      console.log(
        "{ location, company_id, searchQuery }",
        location,
        company_id,
        searchQuery
      );

      const userId = req.user;

      const conditions = [];

      if (location) {
        conditions.push(eq(jobs.location, location as string));
      }

      if (company_id) {
        conditions.push(eq(jobs.companyId, company_id));
      }

      if (searchQuery) {
        conditions.push(ilike(jobs.title, `%${searchQuery as string}%`));
      }

      let query = db
        .select({
          job: jobs,
          savedJobId: saved_jobs.id,
          companyName: companies.name,
          companyLogo: companies.logoUrl,
        })
        .from(jobs)
        .leftJoin(
          saved_jobs,
          and(
            eq(jobs.id, saved_jobs.jobsId),
            eq(saved_jobs.userId, userId as number)
          )
        )
        .leftJoin(companies, eq(jobs.companyId, companies.id))
        .where(conditions.length > 0 ? and(...conditions) : undefined);

      const data = await query;

      return res.json({
        success: true,
        message: "Jobs fetched successfully",
        data: data,
      });
    } catch (error) {
      console.error("Error fetching Jobs:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

type UpdateSaved = {
  isSaved: boolean;
  jobsId: number;
};

export const updateSaved = asyncHandler(
  async (req: Request<any, any, UpdateSaved>, res: Response) => {
    const { isSaved, jobsId } = req.body;
    const userId = req.user as number;
    console.log("isSaved: ", isSaved);

    try {
      if (isSaved) {
        await db
          .delete(saved_jobs)
          .where(
            and(eq(saved_jobs.userId, userId), eq(saved_jobs.jobsId, jobsId))
          );
      } else {
        await db.insert(saved_jobs).values({ jobsId, userId });
      }

      return res.json({
        success: true,
        message: "Jobs fetched successfully",
      });
    } catch (error: any) {
      throw new ApiError(400, error.message);
    }
  }
);

// a comm

type GetSingleJob = z.infer<typeof getSingleJobSchema>;

export const getSingleJob = asyncHandler(
  async (req: Request<any, any, GetSingleJob>, res: Response) => {
    const userId = req.user as number;
    try {
      const { jobId } = getSingleJobSchema.parse(req.body);

      const job = await db
        .select()
        .from(jobs)
        .leftJoin(companies, eq(companies.id, jobs.companyId))
        .leftJoin(
          applications,
          and(
            eq(applications.jobId, jobId),
            eq(applications.candidateId, userId)
          )
        )
        .where(eq(jobs.id, jobId));

      if (job.length == 0) {
        return res.status(200).json({
          success: true,
          message: "no jobs found",
          data: null,
        });
      }

      return res.json({
        success: true,
        message: "job fetched successfully",
        data: job[0],
      });
    } catch (error: any) {
      throw new ApiError(400, error.message);
    }
  }
);

type UpdateJobStatus = z.infer<typeof UpdateJobStatusSchema>;
export const updateJobStatus = asyncHandler(
  async (req: Request<any, any, UpdateJobStatus>, res: Response) => {
    const userId = req.user as number;
    try {
      const { jobId, status } = UpdateJobStatusSchema.parse(req.body);

      const verifyRes = await db
        .select({ recruiterId: jobs.recruiterId })
        .from(jobs)
        .where(eq(jobs.id, jobId));

      if (verifyRes[0].recruiterId !== userId) {
        throw new ApiError(
          401,
          "You are not athorised to change this job status"
        );
      }

      await db.update(jobs).set({ isOpen: status }).where(eq(jobs.id, jobId));

      return res.json({
        success: true,
        message: "status updated successfully",
      });
    } catch (error: any) {
      throw new ApiError(400, error.message);
    }
  }
);

const CreateJobSchema = z.object({
  companyId: z.coerce.number(),
  description: z.string(),
  location: z.string(),
  requirements: z.string(),
  title: z.string(),
});

type CreateJob = z.infer<typeof CreateJobSchema>;

export const createJob = asyncHandler(
  async (req: Request<any, any, CreateJob>, res: Response) => {
    // test
    // return res.status(200).json({
    //   message: "success",
    // });

    const userId = req.user as number;
    try {
      const { companyId, description, location, requirements, title } =
        CreateJobSchema.parse(req.body);

      const userdeatils = await db
        .select({
          userRole: users.role,
        })
        .from(users)
        .where(eq(users.id, userId));

      if (
        userdeatils.length > 0 &&
        userdeatils[0].userRole === roleEnum.candidate
      ) {
        throw new ApiError(
          403,
          "you have to be a recruiter to create job posting"
        );
      }

      const dbRes = await db.insert(jobs).values({
        companyId,
        recruiterId: userId,
        description,
        location,
        requirements,
        title,
      });

      return res.json({
        success: true,
        message: "job created successfully",
      });
    } catch (error: any) {
      throw new ApiError(400, error.message || "error in creating job");
    }
  }
);

export const getSavedJobs = asyncHandler(
  async (req: Request, res: Response) => {
    // test
    // return res.status(200).json({
    //   message: "success",
    // });

    const userId = req.user as number;

    try {
      const savedJobsForUser = await db
        .select({
          savedJobId: saved_jobs.id,
          jobId: jobs.id,
          title: jobs.title,
          description: jobs.description,
          location: jobs.location,
          requirements: jobs.requirements,
          isOpen: jobs.isOpen,
          companyName: companies.name,
          companyLogoUrl: companies.logoUrl,
          jobCreatedAt: jobs.createdAt,
          savedAt: saved_jobs.createdAt,
        })
        .from(saved_jobs)
        .innerJoin(jobs, eq(saved_jobs.jobsId, jobs.id))
        .innerJoin(companies, eq(jobs.companyId, companies.id))
        .where(eq(saved_jobs.userId, userId));

      return res.json({
        success: true,
        message: "saved jobs fetched successfully",
        data: savedJobsForUser,
      });
    } catch (error: any) {
      throw new ApiError(400, error.message || "error in fetching jobs");
    }
  }
);
