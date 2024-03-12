"use client";
import Sidebar from "~/app/(pages)/(main)/_components/sidebar";
import { cn } from "~/lib/utils";
import { useLeftSidebarStore } from "~/store";

export default function LeftSidebarWrapper({sidebarClassName} : {sidebarClassName: string}) {
  const isActive = useLeftSidebarStore((state) => state.isActive);
  const isMobileActive = useLeftSidebarStore((state) => state.isMobileActive);
  const setMobileActive = useLeftSidebarStore((state) => state.setMobileIsActive);

  const disableMobileSidebar = () => setMobileActive(false);

  return (
    <>
      {isActive && <Sidebar className={cn("hidden lg:block", sidebarClassName)} />}
      {isMobileActive && (
        <>
          <div>
            <Sidebar
              className={cn(
                "lg:hidden absolute left-1 top-1/2 z-10 block h-[99%] -translate-y-1/2 rounded-lg border border-cc-border shadow-md ", sidebarClassName
              )}
              onSidebarButtonClick={disableMobileSidebar}
            />
          </div>
          {/* background overlay */}
          <div
            className="lg:hidden absolute h-full w-full bg-cc-content/30 animate-in fade-in"
            onClick={disableMobileSidebar}
          ></div>
        </>
      )}
    </>
  );
}
