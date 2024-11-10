import { Request, Response } from "express";
import { db } from "../db/db";
import { applications, companies } from "../db/schema";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError";
import { z } from "zod";
import { supabase, superbase_url } from "../utils/superBase";

export const getCompanies = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const companieList = await db.select().from(companies);

      return res.status(200).json({
        success: true,
        message: "Companies fetched successfully",
        data: companieList,
      });
    } catch (error: any) {
      throw new ApiError(400, error.message);
    }
  }
);

export const CreateComapanySchema = z.object({
  name: z.string(),
});

type CreateCompany = z.infer<typeof CreateComapanySchema>;

export const createCompany = asyncHandler(
  async (req: Request<any, any, CreateCompany>, res: Response) => {
    // return res.status(200).json({
    //   message: "wecome to create comapny route",
    // });

    const candidateId = req.user as number;
    const { file } = req;

    if (!file) {
      throw new ApiError(400, "required file is missing");
    }


    try {
      const { name } = CreateComapanySchema.parse(req.body);

    const random = Math.floor(Math.random() * 90000);
    const fileName = `resume-${random}-${name}`;

      // TODO
      // change file name

      const comapnyLogoUrl = `${superbase_url}/storage/v1/object/public/job-site/${fileName}`;
      const { data, error } = await supabase.storage
        .from("job-site")
        .upload(fileName, file.buffer);

      if (error) {
        console.log(
          error.message ||
            "error in uploading company immage to supabase storage"
        );
        throw new ApiError(400, "error submitting application");
      }

      await db.insert(companies).values({
        logoUrl: comapnyLogoUrl,
        name,
      });

      return res.json({
        success: true,
        message: "company created successfully",
      });
    } catch (error: any) {
      throw new ApiError(400, error.message);
    }
  }
);
