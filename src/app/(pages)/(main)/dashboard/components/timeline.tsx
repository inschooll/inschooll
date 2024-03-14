"use client";
import React, { useEffect, useRef, useState } from "react";

import "../page.css";
import HourCardList from "./hour-card-list";
import TimeList from "./time-list";
import TimelineHeader from "./timeline-header";

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

/**
 * The timeline is an in-app feature that allows users to see the events they have for the day, events such as classes, meetings, and so on. It's like their schedule for the day
 * 
 * Features
 * - Tick: a tick is a line that goes through the timeline 
 *   indicating the current time of the day
 * - TickTime: is a basically the time of the day, it follows 
 *   the tick around showing time e.g `8:45`
 * - TimeList: is a list that holds all the time of the day starting from 12am, 2am to 10pm
 * - HourCardList: is a list of boxes that represents the hours of the day, they are placed in a row and together they form the `Timeline`
 * - TimelineHeader: is a simple component that displays the date, month and day name (e.g Monday)
 * 
 * Others
 * - When page loads, the tick and the tick time is automatically placed at the current time of the day
 * - The timeline scrollable container is automatically scrolled to keep the tick and tick time in the view of the user
 * - Automatic container scrolling is disabled when user scrolls through the timeline.
 * - When the tick moves from 11:59pm to a new day 0:00am, the day is updated, so it reflects in the `TimelineHeader` component
 * - Makes use of zustand for state management
 * @returns the timeline component
 */
export default function Timeline() {
  const {
    scrollRef1: timeContainerRef,
    scrollRef2: hourCardContainerRef,
    scrollRef3: tickContainerRef,
    scrollPosition,
  } = useSyncScroll();

  return (
    <div className="">
      <TimelineHeader />
      <TimeList ref={timeContainerRef} />
      <HourCardList ref1={hourCardContainerRef} ref2={tickContainerRef} scrollPosition={scrollPosition} />
    </div>
  );
}

/**
 * This hook basically ensures the scroll position of ref1, ref2 and ref3 stay in sync.
 * If one ref scolls, the other 2 scroll to match (sync with) it
 *
 * @returns scrollRef1, scrollRef2
 */
function useSyncScroll() {
  const [scrollRef1, scrollRef2, scrollRef3] = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const [scrollPosition, setScrollPosition] = useState<number|null>(null);

  useEffect(() => {

    // Ensure the scroll for ref1, ref2 and ref3 are in sync
    const updateScrollRef = (
      event: Event,
      ref1: React.RefObject<HTMLDivElement>,
      ref2: React.RefObject<HTMLDivElement>,
    ) => {
      if (!(event.target instanceof Element)) return;

      // sync scroll
      const scrollLeft = event.target?.scrollLeft;
      if (ref1.current) {
        ref1.current.scrollLeft = scrollLeft;
      }
      if (ref2.current) {
        ref2.current.scrollLeft = scrollLeft;
      }

      // update scroll position
      setScrollPosition(scrollLeft);

      console.log(`scrollLeft: ${scrollLeft}`);
    };

    // functions for updating scroll refs
    const updateScroll1 = (e: Event) =>
      updateScrollRef(e, scrollRef2, scrollRef3);
    const updateScroll2 = (e: Event) =>
      updateScrollRef(e, scrollRef1, scrollRef3);
    const updateScroll3 = (e: Event) =>
      updateScrollRef(e, scrollRef1, scrollRef2);

    // call specific sync function for each ref scroll event
    scrollRef1.current?.addEventListener("scroll", updateScroll1);
    scrollRef2.current?.addEventListener("scroll", updateScroll2);
    scrollRef3.current?.addEventListener("scroll", updateScroll3);

    // clean refs up
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      scrollRef1.current?.removeEventListener("scroll", updateScroll1);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      scrollRef2.current?.removeEventListener("scroll", updateScroll2);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      scrollRef3.current?.removeEventListener("scroll", updateScroll3);
    };
  }, []);

  return { scrollRef1, scrollRef2, scrollRef3, scrollPosition };
}
