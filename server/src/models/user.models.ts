import { z } from "zod";

export const newUserProps = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8, "password requirs min 8 characters"),
});

export const loginProps = z.object({
  email: z.string().email(),
  password: z.string(),
});
