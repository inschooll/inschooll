"use client";
import images from "~/app/core/constants/images";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import SidebarButton from "../../../../components/sidebar-button";
import links from "~/app/core/constants/links";
import { LuSchool } from "react-icons/lu";
import { LuHeartHandshake } from "react-icons/lu";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import Link from "next/link";
import AppLogo from "~/components/app_logo";
import ChangeThemeButtons from "~/components/navbar/change-theme-buttons";
import { cn } from "~/lib/utils";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import LeftSidebarActivatorButton from "~/components/buttons/left-sidebar-activator-button";

const sidebarItems = [
  {
    title: "Dashboard",
    icon: <MdOutlineSpaceDashboard size={20} />,
    href: links.dashboard,
  },
  { title: "School", icon: <LuSchool size={20} />, href: links.school },
  {
    title: "Faculties",
    icon: <LuHeartHandshake size={20} />,
    href: links.studentAffairs,
  },
];

type SidebarProps = { className?: string, onSidebarButtonClick?: () => void}

export default function Sidebar({ className, onSidebarButtonClick }: SidebarProps) {
  const pathname = usePathname();
  const selectedIndex = useMemo(() => {
    let index = 0;
    // get selected sidebar index
    sidebarItems.map((item, i) => {
      if (pathname.startsWith(item.href)) index = i;
    });
    return index;
  }, [pathname]);

  return (
    <nav
      className={cn(
        "h-full w-64 shrink-0 overflow-auto border-r-[2px] border-cc-border-main bg-cc-background-sub",
        className,
      )}
    >
      <div className="flex justify-between py-2 pl-4 pr-1 ">
        <div className="flex items-center gap-1">
          <LeftSidebarActivatorButton />
          <Link href={links.dashboard} data-testid="logo-button">
            <AppLogo size="sm" />
          </Link>
        </div>

        <ChangeThemeButtons />
      </div>

      <UserProfileSection />

      <div className="px-4">
        <div>
          <div className="mt-2 flex flex-col gap-2">
            {/* dashboard */}
            {sidebarItems.map((item, index) => {
              return (
                <SidebarButton
                  key={index}
                  title={item.title}
                  icon={item.icon}
                  href={item.href}
                  isSelected={selectedIndex === index}
                  onClick={onSidebarButtonClick}
                />
              );
            })}
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
      <div className="app-hover cursor-pointer px-4 py-3">
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
