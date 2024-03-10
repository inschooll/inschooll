import { T3 } from "~/components/texts/title";
import DashboardNavbar from "./components/dashboard-navbar";
import { Button } from "~/components/ui/button";

export default function Dashboard({ params }: { params: { school: string } }) {
  return (
    <div className="bg-green-5000 py- flex-grow overflow-auto px-4">
      <DashboardNavbar />
      <main className="flex justify-between">
        {/* main content */}
        <div className="bsg-red-500">
          {/* My Day */}
          <div className="">
            <p className="text-cc-content/50">February 7th (Today)</p>
            <div className="flex items-center justify-between">
              <T3>Wednesday</T3>
              {/* today, <> */}
              <div>
                <Button variant="secondary" className="h-7">today</Button>
              </div>
            </div>
          </div>
          {/* Calendar */}
          <div className=""></div>
        </div>

        {/* Right sidebar */}
        <div className="hidden lg:block h-full w-64 border-l border-cc-border bg-cyan-500">s</div>
      </main>
    </div>
  );
}
