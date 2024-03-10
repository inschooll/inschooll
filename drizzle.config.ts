import { type Config } from "drizzle-kit";

import { env } from "~/env";
import { devDBCredentials, prodDBCredentials } from "~/server/db";

export default {
  schema: "./src/server/db/schema.ts",
  out: "./migrations",
  driver: "turso",
  dbCredentials: env.NODE_ENV === 'production' ? prodDBCredentials : devDBCredentials,
  tablesFilter: ["inschooll_*"],
  // Print all statement
  verbose: true,
  // Always ask for my permission
  // strict: true,
} satisfies Config;
