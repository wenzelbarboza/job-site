CREATE TABLE IF NOT EXISTS "jobsite_saved_jobs" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"user_id" integer NOT NULL,
	"jobs_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "jobsite_users" ALTER COLUMN "role" DROP DEFAULT;--> statement-breakpoint
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
