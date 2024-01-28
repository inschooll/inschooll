import React from "react";
import { FaRegEye } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { CriminalCaseTypeIcon } from "~/app/core/constants/icons";
import images from "~/app/core/constants/images";
import links from "~/app/core/constants/links";
import AvatarUsername from "~/components/avatar-username";
import Button2 from "~/components/buttons/button2";
import { T3 } from "~/components/texts/title";
import BreadCrumbs from "~/app/(pages)/(main)/_components/breadcrumbs";
import Navbar from "~/components/navbar";
// import Navbar from '~/components/navbar';

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const breadCrumbData = {
    "Student Affairs": links.studentAffairs,
    SDC: links.sdc,
    Cases: links.cases,
    "🧑‍⚖️ case": links.caseWithId(params.id),
  };

  const navItems = [
    { text: "Body", href: links.caseWithId(params.id) },
    { text: "Comments", href: links.caseWithIdComments(params.id) },
    { text: "Verdict", href: links.caseWithIdVerdict(params.id) },
  ];

  return (
    <div>
      {/* Breadcumbs and views */}
      <div className="flex justify-between pr-10">
        <BreadCrumbs patterns={breadCrumbData} />

        <div className="flex items-center gap-2">
          <FaRegEye className="text-cc-content-main/80" />
          <p className="pb-[1px] text-cc-content-main/80">54 views</p>
        </div>
      </div>

      <div className="pl-7 pr-20">
        <div className="mt-4">
          {/* Title <-> [Buttons] */}
          <div className="flex items-start justify-between gap-10">
            {/* title */}
            <div className="flex items-start gap-3">
              {/* <div className='w-8 bg-red-300'> */}
              <CriminalCaseTypeIcon
                height={25}
                width={25}
                className="mt-2 flex-shrink-0"
              />
              {/* </div> */}
              <T3 weight="medium">
                Stolen laptops found with 3 students Stolen laptops found with 3
                students Stolen laptops found with 3 students
              </T3>
            </div>
            {/* buttons */}
            <div className="mt-1 flex flex-shrink-0 gap-4">
              <Button2 variant="blue">Appeal Case</Button2>
              <Button2 variant="blue">Make Verdict</Button2>
            </div>
          </div>
          {/* Avatar Username */}
          <div className="mt-2">
            <AvatarUsername
              imgUrl={images.maleAvatarDefault}
              text="Abubaka Yahaya"
            />
          </div>
          {/* Open or Close */}
          <div className="mt-4">
            <Pill
              icon={<MdLockOutline className="text-white" size={20} />}
              text="Closed"
            />
            {/* <Pill icon={<MdLockOpen className='text-white' size={20} />} text='Open' bgColor='bg-cc-green-main' /> */}
            {/* <Pill icon={<FaRegClock className='text-white' size={20} />} text='12th Dec 2024' bgColor='bg-purple-500' /> */}
          </div>
        </div>

        <div className="mt-5">
          <Navbar navItems={navItems} />
        </div>
        {children}
      </div>
    </div>
  );
}

function Pill({
  icon,
  text,
  bgColor = "bg-red-500",
  textClassName = "text-white",
}: {
  icon?: React.ReactNode;
  text: string;
  bgColor?: string;
  textClassName?: string;
}) {
  return (
    <div className={`inline-block ${bgColor} rounded-full py-1 pl-2 pr-3`}>
      <div className="flex items-center gap-1">
        {icon}
        <p className={`${textClassName} font-medium`}>{text}</p>
      </div>
    </div>
  );
}
