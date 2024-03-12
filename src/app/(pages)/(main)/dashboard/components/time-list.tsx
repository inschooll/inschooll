import React from "react";
import { HoursData } from "./timeline";
import { HOUR_CARD_SIZE } from "./hour-card-list";

const TimeList = React.forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      className="flex overflow-auto"
      ref={ref}
      style={{
        scrollbarWidth: "none",
      }}
    >
      {HoursData.map((time) => (
        <HourCardTime key={time} time={time} />
      ))}
    </div>
  );
});
TimeList.displayName = "TimeList";

export default TimeList;

function HourCardTime({ time }: { time: string }) {
  return (
    <div className="shrink-0" style={{width: `${HOUR_CARD_SIZE}px`}}>
      <p className="text-sm font-medium text-cc-content/60">{time}</p>
    </div>
  );
}