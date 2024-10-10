DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('applying', 'interviewing', 'hired', 'rejected');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "jobsite_applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"job_id" integer NOT NULL,
	"candidate_id" integer NOT NULL,
	"status" "status" DEFAULT 'applying' NOT NULL,
	"resume" text NOT NULL,
	"skills" text NOT NULL,
	"experience" integer NOT NULL,
	"education" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "jobsite_companies" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"name" text NOT NULL,
	"logo_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "jobsite_jobs" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"recruiter_id" integer NOT NULL,
	"title" text NOT NULL,
	"company_id" integer NOT NULL,
	"description" text NOT NULL,
	"location" text NOT NULL,
	"requirements" text NOT NULL,
	"is_open" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "jobsite_saved_jobs" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"user_id" integer NOT NULL,
	"jobs_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "jobsite_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"password" text DEFAULT '',
	"refresh_token" text,
	"role" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "jobsite_applications" ADD CONSTRAINT "jobsite_applications_job_id_jobsite_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobsite_jobs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "jobsite_applications" ADD CONSTRAINT "jobsite_applications_candidate_id_jobsite_users_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "public"."jobsite_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "jobsite_jobs" ADD CONSTRAINT "jobsite_jobs_recruiter_id_jobsite_users_id_fk" FOREIGN KEY ("recruiter_id") REFERENCES "public"."jobsite_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "jobsite_jobs" ADD CONSTRAINT "jobsite_jobs_company_id_jobsite_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."jobsite_companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "jobsite_saved_jobs" ADD CONSTRAINT "jobsite_saved_jobs_user_id_jobsite_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."jobsite_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "jobsite_saved_jobs" ADD CONSTRAINT "jobsite_saved_jobs_jobs_id_jobsite_jobs_id_fk" FOREIGN KEY ("jobs_id") REFERENCES "public"."jobsite_jobs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
