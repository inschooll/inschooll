import { T3 } from "~/components/texts/title";
import { Button } from "~/components/ui/button";
import icons from "~/lib/constants/icons";
import DashboardNavbar from "./components/dashboard-navbar";

import DashboardRightSidebar from "./components/right-sidebar";
import Timeline from "./components/timeline";
import "./page.css";
import DashboardMainWrapper from "./components/dashboard-main-wrapper";
import { currentDayName, currentMonthName, getDaySuffix } from "~/lib/utils";

export default function Dashboard() {
  return (
    <div className="bg-green-5000">
      {/* <main className="mainCvr"> */}
      <main className="">
        <div className="lg:flex">
          <DashboardMainWrapper>
            <DashboardNavbar />

            <Timeline />
          </DashboardMainWrapper>
          {/* Right sidebar */}
          <DashboardRightSidebar />
        </div>
      </main>
    </div>
  );
}



