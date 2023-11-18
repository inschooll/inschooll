'use server';

import { db } from "~/server/db";
import { api } from "~/trpc/server";

export async function createSchool(formData: FormData) {
  await api.school.getByName.query({name: 'hey'});
  console.log("SERVER ACTIONS");
  await Promise.all([1, 2, 3].map((value) => setTimeout(() => console.log(value), 1000)));
  console.log(formData);
}

// export async function findSchoolByName(name: string) {
//   const school = await api.school.getByName.query({name: name});
//   console.log(school);
//   return school;
// }

export async function findSchoolByName(name: string) {
  console.log(name);
  const school = await db.query.school.findFirst({
    where: (school, { eq }) => eq(school.name, name.trim())
  });
  console.log(school);
  return school;
}