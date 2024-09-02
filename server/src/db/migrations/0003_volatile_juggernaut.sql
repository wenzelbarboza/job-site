ALTER TABLE "jobsite_users" RENAME COLUMN "refreshToken" TO "refresh_token";--> statement-breakpoint
ALTER TABLE "jobsite_users" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "jobsite_users" ALTER COLUMN "updated_at" DROP NOT NULL;