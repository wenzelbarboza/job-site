import { defineConfig } from "drizzle-kit";
import "dotenv/config";
const dbUrl = process.env.DATABASE_URL || "";
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "src/db/migrations",
  dbCredentials: {
    url: dbUrl,
  },
});
