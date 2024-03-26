// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, int,  sqliteTableCreator, text, unique } from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `inschooll_${name}`);

export const user = createTable("user", {
  id: text("id", { length: 256 }).primaryKey(),
  email: text("email", { length: 256 }).notNull().unique(),
  emailVerified: int("email_verified", {mode: 'boolean'}).default(false),
  avatarUrl: text("avatar_url", { length: 256 }),
  firstName: text("first_name", { length: 30 }).notNull(),
  lastName: text("last_name", { length: 30 }).notNull(),
  username: text("username", { length: 30 }).notNull().unique(),
  bio: text("bio", { length: 1000 }),
  password: text("password", { length: 256 }).notNull(),
  gender: text("gender", { length: 10, enum: ["male", "female"] }).notNull(),
  dateOfBirth: text("date_of_birth", { length: 30 }).notNull(), // 01-13-23 (mm-dd-yy)
  phone1: text("phone1", { length: 20 }).notNull(),
  phone2: text("phone2", { length: 20 }),

  // TODO: Add fields
  country_id: text("country_id", { length: 256 }).references(() => country.id, {onDelete: 'set null'}),
  state_id: text("state_id", { length: 256 }).references(() => state.id, {onDelete: 'set null'}),

  createdAt: int("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: int("updatedAt", { mode: "timestamp" }),
}, (table) => ({
  username_idx: index("username_idx").on(table.username),
  email_idx: index("email_idx").on(table.email),
}));
export type userInsertType = typeof user.$inferInsert;


export const school = createTable("school", {
  id: text("id", { length: 256 }).notNull().primaryKey(),
  name: text("name", { length: 256 }).unique().notNull(),
  acronym: text("acronym", { length: 5 }).notNull(),
  motto: text("motto", { length: 256 }).notNull(),
  about: text("about", { length: 2000 }).notNull(),
  cover: text("cover", { length: 256 }).notNull(),
  logo: text("logo", { length: 256 }).notNull(),
  address: text("address", { length: 256 }).notNull(),
  email: text("email", { length: 256 }).notNull(),
  website: text("website", { length: 256 }).notNull(),
  // Education Level
  // School Type
  // Establishment date

  // Tables
  // - Phone numbers
  // - Socials

  country_id: text("country_id", { length: 256 }).references(() => country.id, {onDelete: 'set null'}),
  state_id: text("state_id", { length: 256 }).references(() => state.id, {onDelete: 'set null'}),

  createdAt: int("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: int("updatedAt", { mode: "timestamp" }),
});

export type SchoolTableType = typeof school.$inferInsert;

// FACULTY
export const faculty = createTable(
  "faculty",
  {
    id: text("id", { length: 256 }).notNull().primaryKey(),
    name: text("name", { length: 256 }),
    cover_url: text("cover_url", { length: 256 }),
    description: text("name", { length: 256 }),
    facNo: int("facultyNo").notNull(),

    // dean_id: text("dean_id", { length: 256 }).notNull(),
    school_id: text("school_id", { length: 256 }).notNull().references(() => school.id, {onDelete: 'cascade'}),

    createdAt: int("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    unq: unique().on(table.name, table.school_id),
  }),
);


// DEPARTMENT
export const department = createTable(
  "department",
  {
    id: text("id", { length: 256 }).notNull().primaryKey(),
    name: text("name", { length: 256 }).notNull(),
    cover_url: text("cover_url", { length: 256 }),
    avatar_url: text("avatar_url", { length: 256 }),
    description: text("name", { length: 256 }),
    depNo: int("departmentNo").notNull(),

    // hod_id: text("head_of_department_id", {
    //   length: 256,
    // }).notNull().references(() => user.id),
    faculty_id: text("faculty_id", { length: 256 }).notNull().references(() => faculty.id, {onDelete: 'cascade'}),
    school_id: text("school_id", { length: 256 }).notNull().references(() => school.id, {onDelete: 'cascade'}),

    createdAt: int("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    unq: unique().on(table.name, table.school_id),
  }),
);

// COUNTRY
export const country = createTable(
  "country",
  {
    id: text("id", { length: 256 }).notNull().primaryKey(),
    name: text("name", { length: 100 }).notNull().unique(),
    iso3: text("iso3", { length: 5 }).notNull(),
    iso2: text("iso2", { length: 5 }).notNull(),
    dialingCode1: text("dialing_code_1", { length: 10 }).notNull(),
    dialingCode2: text("dialing_code_2", { length: 10 }),
    dialingCode3: text("dialing_code_3", { length: 10 }),
  },
  (table) => ({
    name_idx: index("name_idx").on(table.name),
  }),
);

// STATE
export const state = createTable(
  "state",
  {
    id: text("id", { length: 256 }).notNull().primaryKey(),
    name: text("name", { length: 100 }).notNull(),
    statusCode: text("status_code", { length: 100 }),
    country_id: text("country_id", { length: 256 }).notNull().references(() => country.id, {onDelete: 'cascade'}),
  },
  (table) => ({
    country_id_idx: index("country_id_idx").on(table.country_id),
  }),
);

// ROLE
export const role = createTable("role", {
  id: text("id", { length: 256 }).notNull().primaryKey(),
  name: text("name", { length: 256 }).unique(),
});

export const user_school_role = createTable(
  "user_school_role",
  {
    user_id: text("user_id", { length: 256 }).notNull().references(() => user.id, {onDelete: 'cascade'}),
    school_id: text("school_id", { length: 256 }).notNull().references(() => school.id, {onDelete: 'cascade'}),
    role_id: text("role_id", { length: 256 }).notNull().references(() => role.id, {onDelete: 'cascade'}),

    verified: int("verified", {mode: 'boolean'}).default(false),

    createdAt: int("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    unq: unique().on(table.user_id, table.school_id, table.role_id),
  }),
);
