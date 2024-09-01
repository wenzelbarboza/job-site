import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import "dotenv/config";

const db_url = process.env.DATABASE_URL || "";

console.log("database url is:  ", db_url);

const migrationClient = postgres(db_url, { max: 1 });

async function runMigrations() {
  try {
    await migrate(drizzle(migrationClient), {
      migrationsFolder: "src/db/migrations",
    });
    console.log("migrations successfull");
    migrationClient.end();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMigrations();
