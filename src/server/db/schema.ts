import { relations, sql } from "drizzle-orm";
import {
  bigint,
  date,
  index,
  int,
  mysqlTableCreator,
  primaryKey,
  smallint,
  text,
  timestamp,
  tinyint,
  varchar,
} from "drizzle-orm/mysql-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `inschooll_${name}`);

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many, one }) => ({
  accounts: many(accounts),
  profile: one(profile, { fields: [users.id], references: [profile.id]}),
}));

export const profile = mysqlTable(
  "profile", 
  {
    id: varchar("id", { length: 255 }).primaryKey(),
    firstName: varchar("first_name", { length: 50 }),
    lastName: varchar("last_name", { length: 50 }),
    username: varchar('username', { length: 30 }),
    idNumber: smallint('id_number'),   // student identification number
    email: varchar('email', { length: 255 }),
    bio: varchar('bio', { length: 1000 }),
    password: varchar('password', { length: 50 }),
    role: varchar('role', { length: 10, enum: ['lecturer', 'student', 'hod', 'staff'] }),
    gender: varchar('gender', { length: 10, enum: ['male', 'female'] }),
    dateOfBirth: date('date_of_birth', {mode: 'date'}),
    dateOfAdmission: date('date_of_admission', {mode: 'date'}),
    phone1: varchar('phone1', { length: 20 }),
    phone2: varchar('phone2', { length: 20 }),

    userId: varchar("user_id", { length: 255 }).notNull().unique(),
    facultyId: varchar("faculty_id", { length: 255 }),
    departmentId: varchar("department_id", { length: 255 }),
    schoolId: varchar("school_id", { length: 255 }),

    createdAt: timestamp('created_at', {mode: "date"}).defaultNow(),
    updatedAt: timestamp('updated_at', {mode: "date"}).onUpdateNow(),
  }, (table) => ({
    userId_Idx: index('user_id_idx').on(table.userId),
  })
);

export const profileRelations = relations(profile, ({ one }) => ({
  user: one(users, {fields: [profile.userId], references: [users.id]}),
  faculty: one(faculty, {fields: [profile.facultyId], references: [faculty.id]}),
  department: one(department, {fields: [profile.departmentId], references: [department.id]}),
  school: one(school, {fields: [profile.schoolId], references: [school.id]}),
}));

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
    userIdIdx: index("userId_idx").on(account.userId),
  })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = mysqlTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("userId_idx").on(session.userId),
  })
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);

// SCHOOL
export const school = mysqlTable(
  'school', 
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    name: varchar('name', { length: 255}),
    description: varchar('description', { length: 255}),
    cover_url: varchar('cover_url', { length: 255}),
    logo_url: varchar('logo_url', { length: 255}),
    address: varchar('address', { length: 255}),
    country: varchar('country', { length: 255}),
    state: varchar('state', { length: 255}),
    email: varchar('email', { length: 255}),
    phone1: varchar('phone1', { length: 20}),
    phone2: varchar('phone2', { length: 20}),
    phone3: varchar('phone3', { length: 20}),
    acronym: varchar('acronym', { length: 5}),
    website_url: varchar('website_url', { length: 255}),
    twitter_url: varchar('twitter_url', { length: 255}),
    instagram_url: varchar('instagram_url', { length: 255}),
    facebook_url: varchar('facebook_url', { length: 255}),

    viceChancellorId: varchar('vice_chancellor_id', { length: 255 }).notNull(),
    chancellorId: varchar('chancellor_id', { length: 255 }).notNull(),

    createdAt: timestamp('created_at', {mode: "date"}).notNull().defaultNow(),
  }
);

export const schoolRelations = relations(school, ({ one }) => ({
  viceChancellor: one(users, { fields: [school.viceChancellorId], references: [users.id] }),
  chancellor: one(users, { fields: [school.chancellorId], references: [users.id] }),
}))

// FACULTY
export const faculty = mysqlTable(
  'faculty',
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    name: varchar('name', { length: 255}),
    cover_url: varchar('cover_url', { length: 255}),
    description: varchar('name', { length: 255}),
    facNo: smallint('facultyNo').notNull(),

    deanId: varchar('dean_id', { length: 255 }).notNull(),
    schoolId: varchar('school_id', { length: 255 }).notNull(),
  
    createdAt: timestamp('created_at', {mode: "date"}).notNull().defaultNow(),
  },
);

export const facultyRelations = relations(faculty, ({ one }) => ({
  dean: one(users, { fields: [faculty.deanId], references: [users.id] }),
  school: one(school, { fields: [faculty.schoolId], references: [school.id] }),
}));

// DEPARTMENT
export const department = mysqlTable(
  'department',
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    name: varchar('name', { length: 255}),
    cover_url: varchar('cover_url', { length: 255}),
    description: varchar('name', { length: 255}),
    depNo: smallint('departmentNo').notNull(),
  
    headOfDepartmentId: varchar('head_of_department_id', { length: 255 }).notNull(),
    facultyId: varchar('faculty_id', { length: 255 }).notNull(),
    schoolId: varchar('school_id', { length: 255 }).notNull(),
  
    createdAt: timestamp('created_at', {mode: "date"}).notNull().defaultNow(),
  },
);

export const departmentRelations = relations(department, ({ one }) => ({
  headOfDepartment: one(profile, { fields: [department.headOfDepartmentId], references: [profile.id] }),
  faculty: one(faculty, { fields: [department.facultyId], references: [faculty.id] }),
  school: one(school, { fields: [department.schoolId], references: [school.id] }),
}));
