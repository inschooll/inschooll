import { T3 } from "~/components/texts/title";
import { Button } from "~/components/ui/button";
import icons from "~/lib/constants/icons";
import DashboardNavbar from "./components/dashboard-navbar";

import Timeline from "./components/timeline";
import "./page.css";

export default function Dashboard() {
  return (
    <div className="bg-green-5000">
      {/* <main className="mainCvr"> */}
      <main className="">
        <div className="lg:flex">
          <div className="px-4 lg:w-[calc(100%-var(--right-dashboard-side-bar-width))]">
            <DashboardNavbar />

            <DashboardBody />

            <Timeline />
          </div>
          {/* Right sidebar */}
          <DashboardRightSidebar />
        </div>
      </main>
    </div>
  );
}

function DashboardBody() {
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

function DashboardRightSidebar({}) {
  return (
    <div className="h-screen w-[var(--right-dashboard-side-bar-width)] bg-orange-300">
      side bar
    </div>
  );
}
