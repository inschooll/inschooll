"use client";
import { useEffect, useRef } from "react";

import "../page.css";

const HoursData = [
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

export default function Timeline() {
  const { timeContainerRef, hourCardContainerRef } = useScrollTimelineSync();

  return (
    <div className="pt-4">
      <div
        className="flex overflow-auto"
        ref={timeContainerRef}
        style={{ scrollbarWidth: "none" }}
      >
        {HoursData.map((hour) => (
          <HourCardTime key={hour} time={hour} />
        ))}
      </div>
      <div
        className="mt-1 flex overflow-auto rounded-lg border border-cc-border"
        ref={hourCardContainerRef}
        style={{ scrollbarWidth: "none" }}
      >
        {HoursData.map((hour) => (
          <HourCard key={hour} />
        ))}
      </div>
    </div>
  );
}

function HourCardTime({ time }: { time: string }) {
  return (
    <div className="w-36 shrink-0">
      <p className="text-sm font-medium text-cc-content/60">{time}</p>
    </div>
  );
}

/**
 * An hour card holds 2 hours
 * @returns jsx
 */
function HourCard() {
  return (
    <div className="HourCardEachCvr size-36 shrink-0 border-r border-cc-border" />
  );
}

function useScrollTimelineSync() {
  const timeContainerRef = useRef<HTMLDivElement>(null);
  const hourCardContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Apply hourCardContainer scroll position to timeContainer scroll position
    const updateTimeContainerPosition = (event: Event) => {
      if (!(event.target instanceof Element)) return;
      if (!timeContainerRef.current) return;

      // sync scroll
      const scrollLeft = event.target?.scrollLeft;
      timeContainerRef.current.scrollLeft = scrollLeft;
    };

    // Apply timeContainer scroll position to hourCardContainer scroll position
    const updateHourCardContainerPosition = (event: Event) => {
      if (!(event.target instanceof Element)) return;
      if (!hourCardContainerRef.current) return;

      // sync scroll
      const scrollLeft = event.target?.scrollLeft;
      hourCardContainerRef.current.scrollLeft = scrollLeft;
    };

    // as we scroll the hourCardContainer, apply same scroll to timeContainer
    hourCardContainerRef.current?.addEventListener(
      "scroll",
      updateTimeContainerPosition,
    );

    // as we scroll the timeContainer, apply same scroll to hourCardContainer
    timeContainerRef.current?.addEventListener(
      "scroll",
      updateHourCardContainerPosition,
    );

    return () => {
      hourCardContainerRef.current?.removeEventListener(
        "scroll",
        updateTimeContainerPosition,
      );
      timeContainerRef.current?.removeEventListener(
        "scroll",
        updateTimeContainerPosition,
      );
    };
  }, []);

  return { timeContainerRef, hourCardContainerRef };
}
