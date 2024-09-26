import { Request, Response } from "express";
import { db } from "../db/db";
import { companies, jobs, saved_jobs } from "../db/schema";
import { and, eq, like } from "drizzle-orm";
import { asyncHandler } from "../utils/asyncHandler";
import { getJobsSchema } from "../models/user.models";
import { sql } from "drizzle-orm";

type getJobs = { location: string; company_id: string; searchQuery: string };

export const getJobs = asyncHandler(
  async (req: Request<any, any, getJobs>, res: Response) => {
    try {
      const { location, company_id, searchQuery } = getJobsSchema.parse(
        req.query
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
        conditions.push(like(jobs.title, `%${searchQuery as string}%`));
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
