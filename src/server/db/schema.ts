import { relations, sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  date,
  index,
  int,
  mysqlTableCreator,
  primaryKey,
  smallint,
  text,
  timestamp,
  tinyint,
  unique,
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



// CUSTOM

export const profile = mysqlTable(
  "profile", 
  {
    id: varchar("id", { length: 255 }).primaryKey(),
    firstName: varchar("first_name", { length: 50 }),
    lastName: varchar("last_name", { length: 50 }),
    username: varchar('username', { length: 30 }).unique(),
    // idNumber: smallint('id_number'),
    email: varchar('email', { length: 255 }),
    bio: varchar('bio', { length: 1000 }),
    password: varchar('password', { length: 50 }),
    // role: varchar('role', { length: 10, enum: ['lecturer', 'student', 'hod', 'staff'] }),
    gender: varchar('gender', { length: 10, enum: ['male', 'female'] }),
    dateOfBirth: date('date_of_birth', {mode: 'date'}),
    // dateOfAdmission: date('date_of_admission', {mode: 'date'}),
    phone1: varchar('phone1', { length: 20 }),
    phone2: varchar('phone2', { length: 20 }),

    userId: varchar("user_id", { length: 255 }).notNull().unique(),
    // facultyId: varchar("faculty_id", { length: 255 }),
    // departmentId: varchar("department_id", { length: 255 }),
    // schoolId: varchar("school_id", { length: 255 }),

    createdAt: timestamp('created_at', {mode: "date"}).defaultNow(),
    updatedAt: timestamp('updated_at', {mode: "date"}).onUpdateNow(),
  }
);

export const profileRelations = relations(profile, ({ one }) => ({
  user: one(users, {fields: [profile.userId], references: [users.id]}),
  // faculty: one(faculty, {fields: [profile.facultyId], references: [faculty.id]}),
  // department: one(department, {fields: [profile.departmentId], references: [department.id]}),
  // school: one(school, {fields: [profile.schoolId], references: [school.id]}),
}));

// SCHOOL
export const school = mysqlTable(
  'school', 
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    name: varchar('name', { length: 255}).unique(),
    about: varchar('about', { length: 5000}),
    motto: varchar('motto', { length: 255}),
    acronym: varchar('acronym', { length: 5}),
    cover: varchar('cover', { length: 255}),
    logo: varchar('logo', { length: 255}),
    address: varchar('address', { length: 255}),
    email: varchar('email', { length: 255}),
    phone1: varchar('phone1', { length: 20}),
    phone2: varchar('phone2', { length: 20}),
    phone3: varchar('phone3', { length: 20}),
    website_url: varchar('website_url', { length: 255}),
    twitter_url: varchar('twitter_url', { length: 255}),
    instagram_url: varchar('instagram_url', { length: 255}),
    facebook_url: varchar('facebook_url', { length: 255}),
    
    chancellor_id: varchar('chancellor_id', { length: 255 }).notNull(),
    country_id: varchar('country_id', { length: 255}),
    state_id: varchar('state_id', { length: 255}),

    createdAt: timestamp('created_at', {mode: "date"}).notNull().defaultNow(),
  }
);

export const schoolRelations = relations(school, ({ one, many }) => ({
  chancellor: one(users, { fields: [school.chancellor_id], references: [users.id] }),
  // countryId: one(country)
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
  (table) => ({
    unq: unique().on(table.name, table.schoolId),
  })
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
    name: varchar('name', { length: 255}).notNull(),
    cover_url: varchar('cover_url', { length: 255}),
    description: varchar('name', { length: 255}),
    depNo: smallint('departmentNo').notNull(),
  
    headOfDepartmentId: varchar('head_of_department_id', { length: 255 }).notNull(),
    facultyId: varchar('faculty_id', { length: 255 }).notNull(),
    schoolId: varchar('school_id', { length: 255 }).notNull(),
  
    createdAt: timestamp('created_at', {mode: "date"}).notNull().defaultNow(),
  },
  (table) => ({
    unq: unique().on(table.name, table.schoolId)
  })
);

export const departmentRelations = relations(department, ({ one }) => ({
  headOfDepartment: one(users, { fields: [department.headOfDepartmentId], references: [users.id] }),
  faculty: one(faculty, { fields: [department.facultyId], references: [faculty.id] }),
  school: one(school, { fields: [department.schoolId], references: [school.id] }),
}));

// COUNTRY
export const country = mysqlTable(
  'country',
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    name: varchar('name', { length: 255}).notNull().unique(),
  },
  (table) => ({
    name_idx: index('name_idx').on(table.name),
  })
  );
  
  export const countryRelations = relations(country, ({one}) => ({
    state: one(state, {fields: [country.id], references: [state.country_id]})
  }))
  
  // STATE
  export const state = mysqlTable(
    'state',
    {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    name: varchar('name', { length: 255}).notNull().unique(),
    
    country_id: varchar('country_id', { length: 255 }).notNull(),
  },
  (table) => ({
    country_id_idx: index('country_id_idx').on(table.country_id),
  })
);

export const stateRelations = relations(state, ({many}) => ({
  country: many(country),
}))

// ROLE
export const role = mysqlTable(
  'role',
  {
    id: varchar('id', { length: 255 }).notNull().primaryKey(),
    name: varchar('name', { length: 255}).unique(),
  }
);

export const user_school_role = mysqlTable(
  'user_school_role',
  {
    user_id: varchar('user_id', { length: 255 }).notNull(),
    school_id: varchar('school_id', { length: 255 }).notNull(),
    role_id: varchar('role_id', { length: 255 }).notNull(),

    verified: boolean('verified').default(false),

    createdAt: timestamp('created_at', {mode: "date"}).notNull().defaultNow(),
  }, 
  (table) => ({
    unq: unique().on(table.user_id, table.school_id, table.role_id)
  })
);

export const user_school_role_relations = relations(user_school_role, ({ many }) => ({
  // user: one(users, {fields: [user_school_role.user_id], references: [users.id]})
  user: many(users),
  school: many(school),
  role: many(role),
}))