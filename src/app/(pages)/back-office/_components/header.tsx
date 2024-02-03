import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { HiMenu } from "react-icons/hi";
import images from '~/app/core/constants/images';
import links from '~/app/core/constants/links';
import AppLogo from '~/components/app_logo';
import Navbar from '~/components/navbar';
import { Button } from "~/components/ui/button";

export default function BackOfficeHeader() {
  
  const navItems = [
    { text: "/", href: links.backoffice.main },
  ];
  
  return (
    <header className='border-b border-cc-border bg-cc-background-sub'>
      <div className="flex items-center gap-4 p-4">
        {/* Menu Button */}
        <Button variant={'secondary'} size={'icon'} className='rounded-lg text-cc-content/50 hover:text-cc-content hover:bg-transparent'>
          <HiMenu size={20}/>
        </Button>

        {/* Logo */}
        <Link href={links.dashboard}>
          <AppLogo size='lg' showAppName={false} />
        </Link>

        {/* School btn */}
        <Button variant={'secondary'} className='ml-5 rounded-lg'>
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
        <Navbar navItems={navItems} className='border-0'/>
      </div>
    </header>
  );
}