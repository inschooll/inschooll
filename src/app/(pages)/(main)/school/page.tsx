import React from 'react'
import BreadCrumbs from '../_components/breadcrumbs'
import links from '~/app/core/constants/links';
import Image from 'next/image';
import images from '~/app/core/constants/images';
import { Button, buttonVariants } from '~/components/ui/button';
import Link from 'next/link';
import { T2 } from '~/components/texts/title';
import Navbar from '~/components/navbar';
import { IoLocationOutline } from 'react-icons/io5';
import { TbBuilding } from "react-icons/tb";

type SchoolPageProps = {
  searchParams: { q: string }
  params: Record<string, unknown>,
};

export default function SchoolPage(props : SchoolPageProps) {
  console.log(props);
  const breadCrumbData = {'school': links.school};
  const navItems = [
    {text: '/', href: links.school},
    {text: 'About', href: '?q=about'},
  ];

  return (
    <div>
      <BreadCrumbs patterns={breadCrumbData} />
      <main>
        {/* Cover */}
        <div className="h-52">
          <Image 
            src={images.school.harvard.classroom}
            alt='school cover image'
            width={10000}
            height={10000}
            className='w-full h-full object-cover'
          />
        </div>

        {/* Content */}
        <div className="bg-cyan-6000 p-2 md:mx-40">
          {/* Logo */}
          <div className="relative">
            <div className="absolute -translate-y-2/3">
              <div className="h-28 w-28 box-border p-5 rounded-full bg-cc-background-sub border-4 border-cc-background">
                <Image 
                  src={images.logos.bingham}
                  alt='school logo'
                  width={500}
                  height={500}
                  className='w-full h-full object-cover'
                />
              </div>
            </div>
          </div>
          {/* Back office button */}
          <div className="flex justify-end">
            <Link href={links.dashboard} className={buttonVariants({variant: 'secondary', size: 'sm'})}>Back office</Link>
          </div>
          {/* School Name */}
          <T2 className='font-bold'>Bingham University</T2>

          {/* About School */}
          <div className="pt-5 flex gap-5 text-cc-content/80">
            <span className='flex items-center gap-1'>
              <IoLocationOutline />
              <p>Federal Capital Territory</p>
            </span>
            <span className='flex items-center gap-1'>
              <TbBuilding />
              <p>Federal Capital Territory</p>
            </span>
          </div>
          
          <div className="pt-4">
            {/* Navbar */}
            <Navbar navItems={navItems} selectedTab={props.searchParams.q} />
          </div>

        </div>
      </main>
    </div>
  )
}
