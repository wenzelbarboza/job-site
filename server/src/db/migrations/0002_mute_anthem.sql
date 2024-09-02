ALTER TABLE "jobsite_users" ALTER COLUMN "password" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "jobsite_users" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "jobsite_users" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "jobsite_users" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "jobsite_users" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "jobsite_users" ADD COLUMN "refreshToken" text;