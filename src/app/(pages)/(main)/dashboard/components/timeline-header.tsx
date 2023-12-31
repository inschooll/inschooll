import { T3 } from "~/components/texts/title";
import { Button } from "~/components/ui/button";
import icons from "~/lib/constants/icons";

import { getDaySuffix } from "~/lib/utils";
import { useDateStore } from "~/store";


export default function TimelineHeader() {
  const {day, dayName, month} = useDateStore();

  return (
    <div className="bg-red-5000 flex flex-1 gap-4">
      {/* Date & My Day */}
      <div className="flex-1">
        <p className="text-cc-content/50">{month} {getDaySuffix(day)}</p>
        <div className="flex items-end justify-between">
          <T3 className="font-bold">{dayName}</T3>
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