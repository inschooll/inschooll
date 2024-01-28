'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { HiMenu } from "react-icons/hi";
import images from '~/app/core/constants/images';
import links from '~/app/core/constants/links';
import AppLogo from '~/components/app_logo';
import Navbar from '~/components/navbar';
import { Button } from "~/components/ui/button";

export const BackOfficeHeader = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') ?? undefined;
  
  const navItems = [
    { text: "Main", href: links.backOffice },
    { text: "Settings", href: "?q=settings"},
  ];
  
  return (
    <header className='border-b border-border bg-zinc-50'>
      <div className="flex items-center gap-4 p-4">
        {/* Menu Button */}
        <Button variant={'outline'} size={'icon'} className='rounded-lg text-cc-content/50 hover:text-cc-content hover:bg-transparent'>
          <HiMenu size={20}/>
        </Button>

        {/* Logo */}
        <Link href={links.dashboard}>
          <AppLogo size='lg' showAppName={false} />
        </Link>

        {/* School btn */}
        <Button variant={'outline'} className='ml-5 rounded-lg'>
          <div className="flex items-center gap-2">
            <Image
              src={images.logos.bingham}
              alt='school logo'
              width={17}
              height={17}
            />
            <p>Bingham University</p>
          </div>
        </Button>
      </div>

      {/* Navbar */}
      <div className="pt-1 px-4">
        <Navbar navItems={navItems} selectedTab={q} className='border-0'/>
      </div>
    </header>
  );
}