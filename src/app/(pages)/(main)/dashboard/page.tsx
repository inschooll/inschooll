import { T3 } from "~/components/texts/title";
import DashboardNavbar from "./components/dashboard-navbar";
import { Button } from "~/components/ui/button";
import icons from "~/lib/constants/icons";
import { cn } from "~/lib/utils";

import "./page.css";

const HoursData = [
  "12am",
  "2am",
  "4am",
  "6am",
  "8am",
  "10am",
  "12pm",
  "2pm",
  "4pm",
  "6pm",
  "8pm",
  "10pm",
];

export default function Dashboard() {
  return (
    <div className="bg-green-5000">
      <main className="">
        <div className="lg:flex">
          <div className="px-4 lg:w-[calc(100%-var(--right-dashboard-side-bar-width))]">
            <DashboardNavbar />

            <DashboardMyDayHeader />

            <HourCardsList />
          </div>
          
          <DashboardRightSidebar/>
        </div>
      </main>
    </div>
  );
}

function DashboardRightSidebar() {
  return <div className="h-screen w-[var(--right-dashboard-side-bar-width)] bg-orange-300">
    side bar
  </div>;
}

function HourCardsList() {
  return (
    <div className="relative flex w-full overflow-auto pt-4">
      {HoursData.map((hour) => (
        <HourCard key={hour} hour={hour} />
      ))}
    </div>
  );
}

function DashboardMyDayHeader() {
  return (
    <div className="bg-red-5000 flex flex-1 gap-4">
      {/* Date & My Day */}
      <div className="flex-1">
        <p className="text-cc-content/50">February 7th</p>
        <div className="flex items-end justify-between">
          <T3 className="font-bold">Wednesday</T3>
          {/* today, <> */}
          <div className="flex items-center gap-2">
            <Button variant="secondary" className="h-7">
              today
            </Button>
            <div className="flex">
              {<icons.left className="text-cc-content/50" />}
              {<icons.right className="text-cc-content/80" />}
            </div>
          </div>
        </div>
      </div>
      {/* Calendar */}
      {/* <DashboardCalendar /> */}
    </div>
  );
}
/**
 * An hour card holds 2 hours
 * @returns jsx
 */
function HourCard({ hour }: { hour: string }) {
  return (
    <div className="space-y-1.5 font-medium text-cc-content/60">
      <p>{hour}</p>
      <div className={cn("size-36 border border-r-0 border-cc-border")}></div>
    </div>
  );
}
