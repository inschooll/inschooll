import { T3 } from "~/components/texts/title";
import { Button } from "~/components/ui/button";
import icons from "~/lib/constants/icons";
import DashboardNavbar from "./components/dashboard-navbar";

import DashboardRightSidebar from "./components/right-sidebar";
import Timeline from "./components/timeline";
import "./page.css";
import DashboardMainWrapper from "./components/dashboard-main-wrapper";

export default function Dashboard() {
  return (
    <div className="bg-green-5000">
      {/* <main className="mainCvr"> */}
      <main className="">
        <div className="lg:flex">
          <DashboardMainWrapper>
            <DashboardNavbar />

            <TimelineHeader />

            <Timeline />
          </DashboardMainWrapper>
          {/* Right sidebar */}
          <DashboardRightSidebar />
        </div>
      </main>
    </div>
  );
}

function TimelineHeader() {
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

