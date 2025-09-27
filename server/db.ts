// server/db.ts
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// Make sure DATABASE_URL is set in your environment
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

// Create the connection to Neon/Postgres
const sql = neon(process.env.DATABASE_URL);

// Export the Drizzle db instance for use in routes/seed scripts
export const db = drizzle(sql);
