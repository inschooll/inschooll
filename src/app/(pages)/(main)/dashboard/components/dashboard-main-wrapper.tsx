"use client";
import { cn } from "~/lib/utils";
import { useRightDashboardSidebarStore } from "~/store";

/**
 * This wrapper simply listens to the state of the rightDashboardSidebarStore 
 * and if the right sidebar is visible (isActive) it adjusts the width of the 
 * Main content of the dashboard to take up less width and if not it expands it
 * @param children: ReactNode 
 * @returns 
 */
export default function DashboardMainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const isActive = useRightDashboardSidebarStore(state => state.isActive);

  return (
    <div
      className={cn(
        "px-4 lg:w-[calc(100%-var(--right-dashboard-side-bar-width))]",
        {"lg:w-full": !isActive}
      )}
    >
      {children}
    </div>
  );
}
