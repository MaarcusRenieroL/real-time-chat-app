import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./.drizzle",
  schema: "./src/lib/db/drizzle/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
