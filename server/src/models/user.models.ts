import { string, z } from "zod";
import { roleEnum } from "../utils/types";

export const newUserProps = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8, "password requirs min 8 characters"),
});

export const loginProps = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const refreshType = z.object({
  role: z.enum([roleEnum.candidate, roleEnum.recruiter]),
  id: z.number(),
});

export const getJobsSchema = z.object({
  location: z.string().optional(),
  company_id: z.coerce.number().optional(),
  searchQuery: z.string().optional(),
});
