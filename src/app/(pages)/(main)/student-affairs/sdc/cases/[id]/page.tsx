import React from 'react';
import { FaRegEye } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import BreadCrumbs from '~/app/(pages)/[school]/_components/breadcrumbs';
import { CriminalCaseTypeIcon } from '~/app/core/constants/icons';
import images from '~/app/core/constants/images';
import links from '~/app/core/constants/links';
import AvatarUsername from '~/components/avatar-username';
import Button2 from '~/components/buttons/button2';
import { T3 } from '~/components/texts/title';
import CaseBody from './_components/body';
// import Navbar from '~/components/navbar';

export default function CasePage({params}: {params: {school: string, id: string}, searchParams: Record<string, string>}) {
  console.log(params);
  const breadCrumbData = {
    "Student Affairs": links.studentAffairs(params.school),
    SDC: links.sdc(params.school),
    Cases: links.cases(params.school),
    "A Case": links.aCase(params.school, params.id),
  };



  return (
    <>
      {/* Breadcumbs and views */}
      <div className="flex justify-between pl-2 pr-10">
        <BreadCrumbs patterns={breadCrumbData} />

        <div className='flex items-center gap-2'>
          <FaRegEye className='text-cc-content-main/80' />
          <p className='text-cc-content-main/80 pb-[1px]'>54 views</p>  
        </div>
      </div>

    <div className='pl-7 pr-20'>

      <div className="mt-4">
        {/* Title <-> [Buttons] */}
        <div className="flex items-start justify-between gap-10">
          {/* title */}
          <div className="flex gap-3 items-start">
            {/* <div className='w-8 bg-red-300'> */}
              <CriminalCaseTypeIcon height={25} width={25} className='flex-shrink-0 mt-2' />
            {/* </div> */}
            <T3 weight='medium'>Stolen laptops found with 3 students Stolen laptops found with 3 students Stolen laptops found with 3 students</T3>
          </div>
          {/* buttons */}
          <div className="flex gap-4 flex-shrink-0 mt-1">
            <Button2 variant='blue'>Appeal Case</Button2>
            <Button2 variant='blue'>Make Verdict</Button2>
          </div>
        </div>
        {/* Avatar Username */}
        <div className="mt-2">
          <AvatarUsername imgUrl={images.maleAvatarDefault} text='Abubaka Yahaya' />
        </div>
        {/* Open or Close */}
        <div className='mt-4'>
          <Pill icon={<MdLockOutline className='text-white' size={20} />} text='Closed' />
          {/* <Pill icon={<MdLockOpen className='text-white' size={20} />} text='Open' bgColor='bg-cc-green-main' /> */}
          {/* <Pill icon={<FaRegClock className='text-white' size={20} />} text='12th Dec 2024' bgColor='bg-purple-500' /> */}
        </div>
      </div>

      <div className="mt-5">
        <CaseBody />
      </div>
    </div>
    </>
  )
}

function Pill({icon, text, bgColor='bg-red-500', textClassName='text-white'} : {icon?: React.ReactNode, text: string, bgColor?: string, textClassName?: string}) {
  return (
    <div className={`inline-block ${bgColor} pl-2 pr-3 py-1 rounded-full`}>
      <div className="flex items-center gap-1">
        {icon}
        <p className={`${textClassName} font-medium`}>{text}</p>
      </div>
    </div>
  );
}

