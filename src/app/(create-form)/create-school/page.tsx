import React from 'react'
import Navbar from '~/app/_components/navbar/navbar'
import { FormBody } from './components/FormBody'
import { protectPage } from '~/core/utils';

export default async function CreateSchool() {
  await protectPage();
  
  return (
    <>
      <Navbar />

      <main className='mb-56 sm:mt-5 sm:px-10 md:max-w-3xl lg:max-w-4xl sm:mx-auto'>
          <FormBody />
      </main>
    </>
  )
}