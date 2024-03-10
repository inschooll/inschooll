import { T3 } from "~/components/texts/title";
import DashboardNavbar from "./components/dashboard-navbar";
import { Button } from "~/components/ui/button";
import icons from "~/lib/constants/icons";
import { cn } from "~/lib/utils";

import "./page.css";
import { Title } from "@radix-ui/react-dialog";

const HoursData = ["12am", "2am", "4am", "6am", "8am", "10am", "12pm", "2pm", "4pm", "6pm", "8pm", "10pm"];
export default function Dashboard() {

  return (
    <div className="bg-green-5000">
      {/* <main className="mainCvr"> */}
      <main className="">
        <div className="lg:flex">
          <div className="lg:w-[calc(100%-var(--right-dashboard-side-bar-width))] px-4">
            <DashboardNavbar />

            <DashboardBody />

            {/* MyDay */}
            <div className="pt-4 overflow-x-scroll">
              <div className="flex">
                {HoursData.map((hour) => (<HourCardTitle key={hour} title={hour} />))}
              </div>
              <div className="mt-4 flex bg-yellow-100 border border-cc-border rounded-lg">
                {HoursData.map((hour) => (<HourCard key={hour} />))}
              </div>
            </div>
          </div>
          {/* Right sidebar */}
          <div className="w-[var(--right-dashboard-side-bar-width)] h-screen bg-orange-300">side bar</div>
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

function HourCardTitle({title}: {title: string}) {
  return (
    <div className="w-36 shrink-0">
      <p className="font-medium text-cc-content/60">{title}</p>
    </div>);
}
/**
 * An hour card holds 2 hours
 * @returns jsx
 */
function HourCard() {
  return (
      <div className={cn("size-36 shrink-0 border-r-0 border-cc-border")}></div>
    // <div className="space-y-1.5">
    // </div>
  );
}

