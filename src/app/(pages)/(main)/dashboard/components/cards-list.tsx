"use client";
import React from "react";
import { useDraggable } from "react-use-draggable-scroll";

import { HOUR_CARD_SIZE } from "./hour-card-list";
import { cn, getStartEndDateRange } from "~/lib/utils";

export const HoursData = [
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

const demoData = [
  {
    title: "CMP 441",
    startTime: new Date(2024, 2, 15, 16, 0),
    endTime: new Date(2024, 2, 15, 18, 0),
    location: "CMPLH",
    color: "#9CC8FF",
  },
  {
    title: "CMP 409",
    startTime: new Date(2024, 2, 15, 19, 0),
    endTime: new Date(2024, 2, 15, 20, 30),
    location: "LH",
    color: "#54A0FF",
  },
  {
    title: "CMP 401",
    startTime: new Date(2024, 2, 15, 22, 0),
    endTime: new Date(2024, 2, 15, 23, 50),
    location: "Hardware Lab",
    color: "#9CC8FF",
  },
];

/**
 * This component is basically a list of hour cards that shows the events we have for a specific day in our timeline.
 */
const CardsList = React.forwardRef<HTMLDivElement, { tickPosition?: number }>(
  ({ tickPosition }, ref) => {
    const { events } = useDraggable(ref as React.MutableRefObject<HTMLElement>);

    return (
      <div
        className="relative mt-1 flex overflow-auto rounded-lg border border-cc-border"
        {...events}
        ref={ref}
        style={{ scrollbarWidth: "none" }}
      >
        {HoursData.map((hour) => (
          <HourCard key={hour} />
        ))}
        {demoData.map((data) => (
          <div
            key={data.title}
            className={cn("absolute top-0 rounded-sm p-2 cursor-pointer", `border`)}
            style={{
              left: (HOUR_CARD_SIZE * data.startTime.getHours()) / 2,
              height: HOUR_CARD_SIZE,
              width: HOUR_CARD_SIZE,
              background: "#C1FFD3",
              borderColor: "#74E996"
              // border: data.color,
            }}
          >
            <h3 className="truncate text-lg font-bold text-black/80">
              {data.title}
            </h3>
            <p className="truncate text-[0.8125rem] text-black/80 ">
              {getStartEndDateRange(data.startTime, data.endTime)}
            </p>
            <p className="truncate text-[0.8125rem] text-black/80 ">{data.location}</p>
          </div>
        ))}
        <Tick tickPosition={tickPosition} />
      </div>
    );
  },
);
CardsList.displayName = "CardsList";
export default CardsList;

/**
 * An hour card holds 2 hours
 * @returns jsx
 */
function HourCard() {
  return (
    <div
      className="HourCardEachCvr shrink-0 border-r border-cc-border"
      style={{
        width: HOUR_CARD_SIZE,
        height: HOUR_CARD_SIZE,
      }}
    />
  );
}

function Tick({ tickPosition }: { tickPosition?: number }) {
  return (
    <div
      className={
        "position delay-400 absolute bottom-0 w-[1px] bg-cc-content/80 transition duration-500 fade-in-10"
      }
      style={{
        opacity: tickPosition ? 1 : 0,
        left: `${tickPosition}px`,
        height: `${HOUR_CARD_SIZE}px`,
      }}
    />
  );
}
