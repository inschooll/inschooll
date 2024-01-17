import {
  boolean,
  index,
  mysqlTableCreator,
  smallint,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `inschooll_${name}`);

export const user = mysqlTable("user", {
  id: varchar("id", { length: 256 }).notNull().primaryKey(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  emailVerified: boolean("email_verified").default(false),
  avatarUrl: varchar("avatar_url", { length: 256 }),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 50 }).notNull(),
  username: varchar("username", { length: 30 }).notNull().unique(),
  bio: varchar("bio", { length: 1000 }),
  password: varchar("password", { length: 256 }).notNull(),
  gender: varchar("gender", { length: 10, enum: ["male", "female"] }).notNull(),
  dateOfBirth: varchar("date_of_birth", { length: 30 }).notNull(), // 01-13-23 (mm-dd-yy)
  phone1: varchar("phone1", { length: 20 }).notNull(),
  phone2: varchar("phone2", { length: 20 }),
  country_id: varchar("country_id", { length: 256 }).references(() => country.id, {onDelete: 'set null'}),
  state_id: varchar("state_id", { length: 256 }).references(() => state.id, {onDelete: 'set null'}),

  // updatedAt: timestamp("updated_at", { mode: "date" }).onUpdateNow(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
}, (table) => ({
  username_idx: index("username_idx").on(table.username),
  email_idx: index("email_idx").on(table.email),
}));
export const userInsertType = typeof user.$inferInsert;

// SCHOOL
export const school = mysqlTable("school", {
  id: varchar("id", { length: 256 }).notNull().primaryKey(),
  name: varchar("name", { length: 256 }).unique(),
  about: varchar("about", { length: 5000 }),
  motto: varchar("motto", { length: 256 }),
  acronym: varchar("acronym", { length: 5 }),
  cover: varchar("cover", { length: 256 }),
  logo: varchar("logo", { length: 256 }),
  address: varchar("address", { length: 256 }),
  email: varchar("email", { length: 256 }),
  phone1: varchar("phone1", { length: 20 }),
  phone2: varchar("phone2", { length: 20 }),
  phone3: varchar("phone3", { length: 20 }),
  website_url: varchar("website_url", { length: 256 }),
  twitter_url: varchar("twitter_url", { length: 256 }),
  instagram_url: varchar("instagram_url", { length: 256 }),
  facebook_url: varchar("facebook_url", { length: 256 }),

  // chancellor_id: varchar("chancellor_id", { length: 256 }).notNull(),
  country_id: varchar("country_id", { length: 256 }).references(() => country.id, {onDelete: 'set null'}),
  state_id: varchar("state_id", { length: 256 }).references(() => state.id, {onDelete: 'set null'}),

  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

// FACULTY
export const faculty = mysqlTable(
  "faculty",
  {
    id: varchar("id", { length: 256 }).notNull().primaryKey(),
    name: varchar("name", { length: 256 }),
    cover_url: varchar("cover_url", { length: 256 }),
    description: varchar("name", { length: 256 }),
    facNo: smallint("facultyNo").notNull(),

    // dean_id: varchar("dean_id", { length: 256 }).notNull(),
    school_id: varchar("school_id", { length: 256 }).notNull().references(() => school.id, {onDelete: 'cascade'}),

    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  },
  (table) => ({
    unq: unique().on(table.name, table.school_id),
  }),
);

// DEPARTMENT
export const department = mysqlTable(
  "department",
  {
    id: varchar("id", { length: 256 }).notNull().primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    cover_url: varchar("cover_url", { length: 256 }),
    avatar_url: varchar("avatar_url", { length: 256 }),
    description: varchar("name", { length: 256 }),
    depNo: smallint("departmentNo").notNull(),

    // hod_id: varchar("head_of_department_id", {
    //   length: 256,
    // }).notNull().references(() => user.id),
    faculty_id: varchar("faculty_id", { length: 256 }).notNull().references(() => faculty.id, {onDelete: 'cascade'}),
    school_id: varchar("school_id", { length: 256 }).notNull().references(() => school.id, {onDelete: 'cascade'}),

    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  },
  (table) => ({
    unq: unique().on(table.name, table.school_id),
  }),
);

// COUNTRY
export const country = mysqlTable(
  "country",
  {
    id: varchar("id", { length: 256 }).notNull().primaryKey(),
    name: varchar("name", { length: 100 }).notNull().unique(),
    iso3: varchar("iso3", { length: 5 }).notNull(),
    iso2: varchar("iso2", { length: 5 }).notNull(),
    dialingCode1: varchar("dialing_code_1", { length: 10 }).notNull(),
    dialingCode2: varchar("dialing_code_2", { length: 10 }),
    dialingCode3: varchar("dialing_code_3", { length: 10 }),
  },
  (table) => ({
    name_idx: index("name_idx").on(table.name),
  }),
);

// STATE
export const state = mysqlTable(
  "state",
  {
    id: varchar("id", { length: 256 }).notNull().primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    statusCode: varchar("status_code", { length: 100 }),
    country_id: varchar("country_id", { length: 256 }).notNull().references(() => country.id, {onDelete: 'cascade'}),
  },
  (table) => ({
    country_id_idx: index("country_id_idx").on(table.country_id),
  }),
);

// ROLE
export const role = mysqlTable("role", {
  id: varchar("id", { length: 256 }).notNull().primaryKey(),
  name: varchar("name", { length: 256 }).unique(),
});

export const user_school_role = mysqlTable(
  "user_school_role",
  {
    user_id: varchar("user_id", { length: 256 }).notNull().references(() => user.id, {onDelete: 'cascade'}),
    school_id: varchar("school_id", { length: 256 }).notNull().references(() => school.id, {onDelete: 'cascade'}),
    role_id: varchar("role_id", { length: 256 }).notNull().references(() => role.id, {onDelete: 'cascade'}),

    verified: boolean("verified").default(false),

    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  },
  (table) => ({
    unq: unique().on(table.user_id, table.school_id, table.role_id),
  }),
);

