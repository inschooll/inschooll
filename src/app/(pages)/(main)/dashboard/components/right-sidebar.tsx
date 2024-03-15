"use client";
import { PanelRight } from "lucide-react";
import { useRightDashboardSidebarStore } from "~/store";

export default function DashboardRightSidebar() {
  return (
    <div className="h-screen w-[var(--right-dashboard-side-bar-width)] border-l border-cc-border">
      <div className="flex h-[3.25rem] items-center justify-end pl-2 pr-4">
        <RightDashboardSidebarToggleButton />
      </div>
    </div>
  );
}

export function RightDashboardSidebarToggleButton() {
  const setIsActive = useRightDashboardSidebarStore(
    (state) => state.setIsActive,
  );
  const isActive = useRightDashboardSidebarStore((state) => state.isActive);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <PanelRight
      className="cursor-pointer text-cc-content/70 transition duration-200 hover:text-cc-content"
      onClick={handleClick}
    />
  );
}
