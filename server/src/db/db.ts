import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const db_url = process.env.DATABASE_URL || "";

const queryClient = postgres(db_url);
export const db = drizzle(queryClient);
