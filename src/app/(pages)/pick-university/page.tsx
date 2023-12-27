import React from 'react'
import TopNavbar from '~/app/_components/navbar/navbar';
import PickUniversityBody from './body';
import { api } from '~/trpc/server';

export default async function PickUniversity() {
  const schools = await api.school.getAll.query({limit: 6, skip: 0});

  console.log(schools);

  return (
    <>
      <TopNavbar />

      <main>
        <div className='my-14 max-w-[1300px] mx-auto px-5 sm:px-10 lg:px-20 h-full'>
          {/* Title */}
          <h1 className="font-bold text-4xl sm:text-6xl">
            Pick University
          </h1>

          <PickUniversityBody initialSchools={schools} />
          
        </div>
      </main>

    </>
  );
}