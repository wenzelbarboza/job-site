import { z } from "zod";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { ApiError } from "../utils/apiError";
import { db } from "../db/db";
import { applications, companies, jobs } from "../db/schema";
import { supabase, superbase_url } from "../utils/superBase";
import { eq } from "drizzle-orm";

export const ApplyJobSchema = z.object({
  experience: z.coerce
    .number()
    .min(0, { message: "Experience must be at least 0" })
    .int(),
  skills: z.string().min(1, { message: "Skills are required" }),
  education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {
    message: "Education is required",
  }),
  jobId: z.coerce.number(),
  resume: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "application/pdf" ||
          file[0].type === "application/msword")
    )
    .optional(),
});

type ApplyJob = z.infer<typeof ApplyJobSchema>;

export const applyJob = asyncHandler(
  async (req: Request<any, any, ApplyJob>, res: Response) => {
    const candidateId = req.user as number;
    const files = req.files as Express.Multer.File[] | undefined;
    let file: Express.Multer.File | undefined;

    if (files && files.length) {
      file = files[0];
    }

    if (!file) {
      throw new ApiError(400, "required file is missing");
    }
    const split = file.originalname.split(".");
    const ext = split[split.length - 1];
    const random = Math.floor(Math.random() * 90000);
    const fileName = `resume-${random}-${candidateId}.${ext}`;

    try {
      const { education, experience, skills, jobId } = ApplyJobSchema.parse(
        req.body
      );

      // TODO
      // change file name
      const resume = `${superbase_url}/storage/v1/object/public/resumes/${fileName}`;
      const { data, error } = await supabase.storage
        .from("resume")
        .upload(fileName, file.buffer);

      if (error) {
        throw new ApiError(
          400,
          error.message || "error submitting application"
        );
      }

      await db.insert(applications).values({
        education,
        experience,
        jobId,
        resume,
        skills,
        candidateId,
      });

      return res.json({
        success: true,
        message: "applied successfully",
      });
    } catch (error: any) {
      throw new ApiError(400, error.message);
    }
  }
);

const getApplicationSchema = z.object({
  jobId: z.coerce.number(),
});

type GetApplications = z.infer<typeof getApplicationSchema>;

export const getApplications = asyncHandler(
  async (req: Request<any, any, GetApplications>, res: Response) => {
    // return the jobs for the perticular job opening
    // check if the requesting id is of a recruiter
    // get the jobs list and return
    const candidateId = req.user as number;

    try {
      const { jobId } = getApplicationSchema.parse(req.body);

      const applicationList = await db
        .select()
        .from(applications)
        .where(eq(applications.jobId, jobId));

      return res.json({
        success: true,
        message: "found the all the applicaions",
        data: applicationList,
      });
    } catch (error: any) {
      throw new ApiError(400, error.message);
    }
  }
);

const getApplicantApplicationSchema = z.object({
  jobId: z.coerce.number(),
});

type GetApplicantApplications = z.infer<typeof getApplicantApplicationSchema>;

export const getApplicantApplications = asyncHandler(
  async (req: Request<any, any, GetApplicantApplications>, res: Response) => {
    const candidateId = req.user as number;

    try {
      // const { jobId } = getApplicationSchema.parse(req.body);

      // <ApplicationCard
      //     key={application.id}
      //     {...application}
      //     isCandidate={isCandidate}
      //     companyName={data.data?.companies?.name || ""}
      //     jobTitle={data.data?.jobs.title || ""}
      //     refetchApplications={refetchApplications}
      //     isLoading={isLoading}
      //   />

      const applicationList = await db
        .select()
        .from(applications)
        .leftJoin(jobs, eq(jobs.id, applications.jobId))
        .leftJoin(companies, eq(companies.id, jobs.companyId))
        .where(eq(applications.candidateId, candidateId));

      return res.json({
        success: true,
        message: "applicarions fetched successfully",
        data: applicationList,
      });
    } catch (error: any) {
      throw new ApiError(400, error.message || "error in fetching application");
    }
  }
);

const UpdateStatusSchema = z.object({
  // status: z.enum(["applied", "interviewing", "hired", "rejected"]),
  status: z.enum(["applied", "interviewing", "hired", "rejected"]),
  // status: z.string(),
  applicationId: z.coerce.number(),
});

export const updateStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const candidateId = req.user as number;
    console.log("request body inside updateStatus: ", req.body);

    try {
      const { applicationId, status } = UpdateStatusSchema.parse(req.body);

      await db
        .update(applications)
        .set({ status })
        .where(eq(applications.id, applicationId));

      return res.status(200).json({
        success: true,
        message: "status updated successfully",
      });
    } catch (error: any) {
      throw new ApiError(400, error.message || "error updationg the status");
    }
  }
);
