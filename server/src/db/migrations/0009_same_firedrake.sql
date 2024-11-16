-- Change the status column to text temporarily
-- Step 1: Temporarily change the column to text
ALTER TABLE "jobsite_applications" ALTER COLUMN status TYPE text USING status::text;
UPDATE "jobsite_applications" SET status = 'applied' WHERE status = 'applying';

-- Step 2: Drop the old enum type
DROP TYPE IF EXISTS status CASCADE;

-- Step 3: Create the new enum type with updated values
CREATE TYPE status AS ENUM ('applied', 'interviewing', 'hired', 'rejected');

-- Step 4: Change the column back to use the new enum type
ALTER TABLE "jobsite_applications" ALTER COLUMN status TYPE status USING status::status;


ALTER TABLE "jobsite_applications" ALTER COLUMN "status" SET DEFAULT 'applied';