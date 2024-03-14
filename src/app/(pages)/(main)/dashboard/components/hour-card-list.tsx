"use client";
import React, { useEffect } from "react";
import { formatTimePadStart } from "~/lib/utils";
import {
  useAutomaticScrollToMatchTickPositionUpdate,
  useLatestTickInfo,
  useUpdateDate,
  useUpdateUserScrolled,
} from "../hooks";
import { HoursData } from "./timeline";

export const SECONDS_PER_MINUTE = 60;
export const HOUR_CARD_SIZE = 144; // px

const HourCardList = React.forwardRef<
  HTMLDivElement,
  {
    ref1: React.RefObject<HTMLDivElement>;
    ref2: React.RefObject<HTMLDivElement>;
    scrollPosition: number | null;
  }
>(({ ref1, ref2, scrollPosition }) => {
  const { tickPosition, tickTime } = useLatestTickInfo();
  useAutomaticScrollToMatchTickPositionUpdate(
    tickTime,
    tickPosition,
    ref1.current!,
  );
  useUpdateDate(tickTime);
  useUpdateUserScrolled(scrollPosition);

  return (
    <div className="">
      <div
        className="relative mt-1 flex overflow-auto rounded-lg border border-cc-border"
        ref={ref1}
        style={{ scrollbarWidth: "none" }}
      >
        {HoursData.map((hour) => (
          <HourCard key={hour} />
        ))}
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
      </div>
      <div
        className="bg-sky-20 relative h-8 overflow-auto"
        ref={ref2}
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
                {tickTime.meridiem == "am" ? formatTimePadStart(tickTime.hour) : tickTime.hour}:
                {formatTimePadStart(tickTime.minute)}
                {/* {tickTime.meridiem} */}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
HourCardList.displayName = "HourCardList";
export default HourCardList;

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

