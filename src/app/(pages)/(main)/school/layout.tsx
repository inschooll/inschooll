import React from "react";
import BreadCrumbs from "../_components/breadcrumbs";
import links from "~/app/core/constants/links";
import Image from "next/image";
import images from "~/app/core/constants/images";
import { buttonVariants } from "~/components/ui/button";
import Link from "next/link";
import { T2 } from "~/components/texts/title";
import Navbar from "~/components/navbar";
import { IoLocationOutline } from "react-icons/io5";
import { TbBuilding } from "react-icons/tb";

export default function Layout({children} : { children: React.ReactNode}) {
  // const breadCrumbData = { school: links.school };
  const navItems = [
    { text: "/", href: links.school },
    { text: "About", href: links.schoolAbout },
  ];

  return (
    <div>
    
    <div>
      {/* Cover */}
      <div className="h-52">
        <Image
          src={images.school.harvard.classroom}
          alt="school cover image"
          width={10000}
          height={10000}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="bg-cyan-6000 p-2 sm:p-5 md:mx-10 xl:mx-40">
        {/* Logo */}
        <div className="relative">
          <div className="absolute -translate-y-2/3">
            <div className="box-border h-28 w-28 rounded-full border-4 border-cc-background bg-cc-background-sub p-5">
              <Image
                src={images.logos.bingham}
                alt="school logo"
                width={500}
                height={500}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
        {/* Back office button */}
        <div className="flex justify-end">
          <Link
            href={links.backoffice.default}
            className={buttonVariants({ variant: "secondary", size: "sm" })}
          >
            Back office
          </Link>
        </div>
        {/* School Name */}
        <T2 className="font-bold">Bingham University</T2>

        {/* About School */}
        <div className="flex gap-5 pt-2 md:pt-5 text-cc-content/80">
          <span className="flex items-center gap-1">
            <IoLocationOutline />
            <p>Federal Capital Territory</p>
          </span>
          <span className="flex items-center gap-1">
            <TbBuilding />
            <p>Federal Capital Territory</p>
          </span>
        </div>

        {/* Navbar */}
        <div className="pt-4">
          <Navbar navItems={navItems} />
          {children}
        </div>
      </div>

    </div>
  </div>
  )
}
