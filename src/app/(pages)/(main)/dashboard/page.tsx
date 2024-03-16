import DashboardNavbar from "./components/dashboard-navbar";

import DashboardMainWrapper from "./components/dashboard-main-wrapper";
import DashboardRightSidebar from "./components/right-sidebar";
import Timeline from "./components/timeline";
import "./page.css";

export default function Dashboard() {

  return (
    <div className="bg-green-5000">
      <main className="">
        <div className="lg:flex">
          <DashboardMainWrapper>
            <DashboardNavbar />
            <Timeline />
          </DashboardMainWrapper>

          <DashboardRightSidebar />
        </div>
      </main>
    </div>
  );
}



