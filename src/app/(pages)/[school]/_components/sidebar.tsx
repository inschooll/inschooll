import images from "~/app/core/constants/images";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import MenuCard from "./menu-card";
import links from "~/app/core/constants/links";
import { LuSchool } from "react-icons/lu";
import { LuHeartHandshake } from "react-icons/lu";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import Link from "next/link";
import AppLogo from "~/app/_components/app_logo";
import ChangeThemeButtons from "~/app/_components/navbar/change-theme-buttons";

// export default function DashboardNavbar({params}: {params: {school: string}}) {
export default function Sidebar({schoolName}: {schoolName: string}) {
  return (
    <nav className="w-64 overflow-auto border-r-[3px] border-cc-border-main bg-cc-background-sub shrink-0">
      <div className="flex justify-between py-2 pl-4 pr-1 ">
        {/* logo */}
        <Link href={links.dashboard(schoolName)} data-testid="logo-button">
          <AppLogo variance="sm" />
        </Link>

        {/* Buttons to toggle Light mode and dark mode */}
        <ChangeThemeButtons />
      </div>

      <UserProfileSection />

      {/* Actions section */}
      <div className="px-4">
        <div>
          <div className="mt-2 flex flex-col gap-2">
            {/* dashboard */}
            <MenuCard 
              title="Dashboard"
              icon={<MdOutlineSpaceDashboard className="" size={20} />}
              schoolName={schoolName}
              navigateTo={links.dashboard(schoolName)}
              />
            {/* school */}
            <MenuCard 
              title="School"
              icon={<LuSchool className="" size={20} />}
              schoolName={schoolName}
              navigateTo={links.school(schoolName)}
              />
            {/* sdc */}
            <MenuCard 
              title="Student Affairs"
              icon={<LuHeartHandshake className="" size={20} />}
              schoolName={schoolName}
              navigateTo={links.studentAffairs(schoolName)}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

function UserProfileSection() {
  return (
    <>
      {/* User Account */}
      <div className="cursor-pointer px-4 py-3 app-hover">
        <div className="bg-red-3000 flex items-center gap-3">
          {/* image */}
          <div className="h-9 w-9 overflow-hidden rounded-full">
            <Image
              src={images.random1}
              alt="profile image"
              width={100}
              height={100}
              className="h-full w-full object-cover"
            />
          </div>
          {/* column - Name, role */}
          <div className="flex flex-grow items-center justify-between">
            <div className="w-36">
              <h3 className="truncate text-sm font-bold text-cc-content-main/80">
                Chukwu Daniel Nonso
              </h3>
              <p className="truncate text-sm font-medium text-cc-content-sub/50">
                school owner
              </p>
            </div>
            {/* options icon */}
            <BsThreeDots className="cursor-pointer text-cc-content-sub hover:text-cc-content-main" />
          </div>
        </div>
      </div>
    </>
  );
}


