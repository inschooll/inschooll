"use client";
import React from "react";
import type { TTickTime } from "~/lib/types";
import { formatTimePadStart } from "~/lib/utils";
import { HOUR_CARD_SIZE } from "./hour-card-list";

const TickTime = React.forwardRef<
  HTMLDivElement,
  { tickPosition?: number; tickTime?: TTickTime }
>(({ tickPosition, tickTime }, ref) => {
  return (
    <div
      className="bg-sky-20 relative h-8 overflow-auto"
      ref={ref}
      style={{ scrollbarWidth: "none" }}
    >
      <div
        className="font-semibold"
        style={{ width: `${HOUR_CARD_SIZE * 12}px` }}
      >
        <div
          className="absolute top-0 -translate-x-1/2 transition duration-1000 fade-in-5"
          style={{ left: `${tickPosition}px` }}
        >
          {!!tickTime && (
            <p className="text-xs">
              {tickTime.meridiem == "am"
                ? formatTimePadStart(tickTime.hour)
                : tickTime.hour}
              :{formatTimePadStart(tickTime.minute)}
              {/* {tickTime.meridiem} */}
            </p>
          )}
        </div>
      </div>
    </div>
  );
});
TickTime.displayName = "TickTime";

export default TickTime;