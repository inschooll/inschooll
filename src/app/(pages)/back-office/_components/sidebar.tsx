'use client';
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { LuBookMinus } from "react-icons/lu";
import { PiGraduationCapBold } from "react-icons/pi";
import { RiBuilding2Line } from "react-icons/ri";
import links from "~/app/core/constants/links";
import Divider from "~/components/divider";
import SidebarButton from "~/components/sidebar-button";
import { cn } from "~/lib/utils";


export default function BackOfficeSidebar ({className} : {className?: string}) {
  const [sidebarItems] = useState([
    {title: "General", icon: <IoSettingsOutline />, href: links.backoffice.main},
    {title: "Campus", icon: <RiBuilding2Line />, href: links.backoffice.campus.main},
    {title: "Faculties", icon: <PiGraduationCapBold />, href: links.backoffice.faculties.main},
    {title: "Departments", icon: <LuBookMinus />, href: links.backoffice.departments.main},
    {title: "Courses", icon: <FaChalkboardTeacher />, href: links.backoffice.courses.main},
  ]);

  const pathname = usePathname();
  const selectedIndex = useMemo(() => {
    let index = 0;
    // set selected sidebar item index
    sidebarItems.map((item, i) => {
      if (pathname.startsWith(item.href)) index = i;
    });

    return index;
  }, [pathname, sidebarItems]);

  
  return (
    <nav className={cn("w-64 overflow-auto border-r-[1px] border-cc-border-main shrink-0", className)}>
      <div className="px-4">
        <div>
          <div className="mt-2 flex flex-col gap-2">
            {/* dashboard */}
            <SidebarButton
              title={sidebarItems[0]!.title}
              icon={sidebarItems[0]!.icon}
              href={sidebarItems[0]!.href}
              isSelected={selectedIndex === 0}
            />
              <Divider />
              
            {/* school */}
            {sidebarItems.slice(1,).map((item, i) => {
              const index = i+1;
              return (
                <SidebarButton
                  key={index} 
                  title={item.title}
                  icon={item.icon}
                  href={item.href}
                  isSelected={selectedIndex === index}
                />
            )})}
          </div>
        </div>
      </div>
    </nav>
  );
}