import { LuHeartHandshake, LuSchool } from "react-icons/lu";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import links from "~/app/core/constants/links";
import { BackOfficeHeader } from "./_components/back-office-header";
import SidebarButton from "~/components/sidebar-button";

export default function Layout({children} : {children: React.ReactNode}) {
  return (
    <div>
      <BackOfficeHeader />
      <div className="">
        {children}
      </div>
    </div>
  )
}

const BackOfficeSidebar = () => {
  return (
    <nav>
      <div className="px-4">
        <div>
          <div className="mt-2 flex flex-col gap-2">
            {/* dashboard */}
            <SidebarButton 
              title="Dashboard"
              icon={<MdOutlineSpaceDashboard className="" size={20} />}
              navigateTo={links.dashboard}
              />
            {/* school */}
            <SidebarButton 
              title="School"
              icon={<LuSchool className="" size={20} />}
              navigateTo={links.school}
              />
            {/* sdc */}
            <SidebarButton 
              title="Student Affairs"
              icon={<LuHeartHandshake className="" size={20} />}
              navigateTo={links.studentAffairs}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

