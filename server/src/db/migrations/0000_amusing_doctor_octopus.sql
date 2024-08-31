CREATE TABLE IF NOT EXISTS "jobsite_users" (
	"id" serial NOT NULL,
	"name" text,
	"email" text,
	"password" text,
	"role" text DEFAULT 'customer',
	"created_at" timestamp,
	"updated_at" timestamp
);
