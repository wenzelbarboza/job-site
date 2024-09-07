import { sql } from "drizzle-orm";
import {
  serial,
  text,
  timestamp,
  pgTableCreator,
  integer,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";
import { refreshType } from "../models/user.models";
import { roleEnum } from "../utils/types";

const pgTable = pgTableCreator((name) => `jobsite_${name}`);

// Fix updated at
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  password: text("password").default(""),
  refreshToken: text("refresh_token"),
  role: text("role").$type<roleEnum.candidate | roleEnum.recruiter>(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const companies = pgTable("companies", {
  id: serial("id").primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).default(
    sql`now()`
  ),
  name: text("name").notNull(),
  logoUrl: text("logo_url").notNull(),
});

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).default(
    sql`now()`
  ),
  recruiterId: integer("recruiter_id")
    .notNull()
    .references(() => users.id),
  title: text("title").notNull(),
  companyId: integer("company_id")
    .notNull()
    .references(() => companies.id),
  description: text("description").notNull(),
  location: text("location").notNull(),
  requirements: text("requirements").notNull(),
  isOpen: boolean("is_open").default(true).notNull(),
});

export const statusEnum = pgEnum("status", [
  "applying",
  "interviewing",
  "hired",
  "rejected",
]);

export const applications = pgTable("applications", {
  id: serial("id").primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).default(
    sql`now()`
  ),
  jobId: integer("job_id")
    .notNull()
    .references(() => jobs.id, { onDelete: "cascade" }),
  candidateId: integer("candidate_id")
    .notNull()
    .references(() => users.id),
  status: statusEnum("status").notNull(),
  resume: text("resume").notNull(),
  skills: text("skills").notNull(),
  experience: text("experience").notNull(),
  education: text("education").notNull(),
  name: text("name").notNull(),
});
