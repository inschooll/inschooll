import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import { env } from "~/env";
import * as schema from "./schema";

export const prodDBCredentials = { url: env.TURSO_DATABASE_URL, authToken: env.TURSO_AUTH_TOKEN };
export const devDBCredentials = { url: "http://127.0.0.1:8080" }

const client = createClient(env.NODE_ENV === 'production' ? prodDBCredentials : devDBCredentials);


export const db = drizzle(client, { schema });