'use client';

import React from 'react'
import Image from 'next/image';
import images from '../core/constants/images';;
import TextInputField from '../_components/inputs/text_input_field';
import Button from '../_components/buttons/button';
import Navbar from '../_components/navbar/navbar';

const PickUniversity = () => {
  const searchRef = React.useRef;
  const [selectedSchool, setSelectedSchool] = React.useState<number | null>(null);

  return (
    <>
      <Navbar />

      <main>
        <div className='my-14 max-w-[1300px] mx-auto px-5 sm:px-10 lg:px-20 h-full'>
          {/* Title */}
          <h1 className="font-bold text-4xl sm:text-6xl">
            Pick University
          </h1>

          {/* Navbar */}
          <div className="mt-7 flex justify-between items-center">
            <div className='grid grid-cols-5 sm:w-[400px]'>
              <div className="col-span-2">
                {/* Country and Icon */}
                <p className="text-cc-content-main/50">Nigeria, Abuja</p>
              </div>
            </div>

            <div>
              <TextInputField ref={searchRef} name='search' type='text' placeholder='Search' />
            </div>
          </div>

          {/* schools list */}
          <div className='mt-10 pb-20 grid gap-3 sm:grid-cols-2 md:grid-cols-39 lg:grid-cols-4'>
            {[1,2,3,4,5,6,7,8,9,10].map((item, index) => (<UniversityCard key={index} isSelected={item === selectedSchool} onClick={() => setSelectedSchool(item)}/>))}
          </div>

          {/* Button */}
          {selectedSchool && <div className="relative">
            <div className="fixed bottom-5 right-10 sm:right-52 w-56">
              <Button variant={'defaultFull'} size={'md'}>Next</Button>
            </div>
          </div>}
          
        </div>
      </main>

    </>
  );
}

export default PickUniversity;


const UniversityCard = ({isSelected, onClick} : {isSelected: boolean, onClick: React.MouseEventHandler<HTMLDivElement>}) => {

  return (
    <div className='rounded border-[1px]' style={isSelected ? {boxShadow: '0 0 1px 2px #C3DEFF', borderColor: '#54A0FF'} : {}}>
      <div className='text-center border-[1px] border-cc-content-main/20 rounded px-4 py-7 cursor-pointer' onClick={onClick}>
        {/* Logo */}
        <div className="flex justify-center">
          <Image src={images.schoolLogo} alt='school logo' width={100} height={100}/>
        </div>
        {/* School name */}
        <div className="mt-4"><h3 className='font-semibold text-lg text-cc-content-main/90'>Bingham University</h3></div>
        {/* motto */}
        <div className="mt-2"><p className='text-cc-content-main/40 truncate text-[15px]'>In God we trust</p></div>
        
        {/* images */}
        <div className="mt-4 grid grid-cols-3 gap-1">
          <div className=""> <Image src={images.random1} alt='school image' width={0} height={0} style={{width: '100%'}} className='rounded-tl'/> </div>
          <div className=""> <Image src={images.random1} alt='school image' width={0} height={0} style={{width: '100%'}}/> </div>
          <div className=""> <Image src={images.random1} alt='school image' width={0} height={0} style={{width: '100%'}} className='rounded-tr'/> </div>
        </div>
        {/* location */}
        <div className="mt-4"><p className='text-cc-content-main/50 text-[15px]'>New Karu, Nasarawa</p></div>

      </div>
    </div>
  );
}