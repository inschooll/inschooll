'use client';
import Link from "next/link";
import links from "~/lib/constants/links";
import AppLogo from "~/components/app_logo";
import LeftSidebarActivatorButton from "~/components/buttons/left-sidebar-activator-button";
import { cn } from "~/lib/utils";
import { useLeftSidebarStore } from "~/store";
import BreadCrumbs from "../../_components/breadcrumbs";

const breadCrumbData = {'Dashboard': links.dashboard};

export default function DashboardNavbar({}) {
  const isActive = useLeftSidebarStore(state => state.isActive);
  const isMobileActive = useLeftSidebarStore(state => state.isMobileActive);


  return (
    <div className="flex gap-2 items-center">
      {!isActive && <SidebarActivatorAndAppLogo className="hidden lg:flex" />}
      {!isMobileActive && <SidebarActivatorAndAppLogo className="flex lg:hidden" />}
      <BreadCrumbs patterns={breadCrumbData} />

    </div>
  );
}

function SidebarActivatorAndAppLogo({className} : {className: string}) {
  return (
    <div className={cn("flex items-center gap-1 py-2", className)}>
      <LeftSidebarActivatorButton />

      {/* Logo */}
      <Link href={links.dashboard}>
        <AppLogo size="sm" showAppName={false} />
      </Link>
    </div>
  );
}
