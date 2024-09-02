import { serial, text, timestamp, pgTableCreator } from "drizzle-orm/pg-core";

const pgTable = pgTableCreator((name) => `jobsite_${name}`);

// Fix updated at
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  password: text("password").default(""),
  refreshToken: text("refresh_token"),
  role: text("role").$type<"admin" | "customer">().default("customer"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
