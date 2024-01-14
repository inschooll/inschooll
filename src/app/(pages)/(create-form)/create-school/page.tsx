import React from 'react'
import TopNavbar from '~/app/_components/navbar/navbar'
import { FormBody } from './components/FormBody';

export default function CreateSchoolPage() {
  return (
    <>
      <TopNavbar />

      <main className='mb-56 sm:mt-5 sm:px-10 md:max-w-3xl lg:max-w-4xl sm:mx-auto'>
          <FormBody />
      </main>
    </>
  )
}