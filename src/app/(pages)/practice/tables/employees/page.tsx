import React from 'react'
import { DataTable } from './data-table'
import { Employee, columns } from './columns'

const employees: Employee[] = [
  {
    id: crypto.randomUUID(),
    name: 'Daniel',
    age: 32,
    gender: 'male',
    role: 'software engineer',
    hasNIN: true,
  },
  {
    id: crypto.randomUUID(),
    name: 'Adamu',
    age: 25,
    gender: 'male',
    role: 'Mechanical Engineer',
    hasNIN: true,
  },
  {
    id: crypto.randomUUID(),
    name: 'Sharon musa',
    age: 29,
    gender: 'female',
    role: 'Teacher',
    hasNIN: false,
  },
  {
    id: crypto.randomUUID(),
    name: 'Becky rebecca',
    age: 18,
    gender: 'female',
    role: 'Student',
    hasNIN: true,
  },
];

const getData = async (): Promise<Employee[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return employees;
}

export default async function page() {
  const data = await getData();

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
