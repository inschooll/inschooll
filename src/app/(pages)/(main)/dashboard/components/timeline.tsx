"use client";
import React, { useEffect, useRef } from "react";

import "../page.css";
import HourCardList from "./hour-card-list";
import TimeList from "./time-list";

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

export default function Timeline() {
  const {
    scrollRef1: timeContainerRef,
    scrollRef2: hourCardContainerRef,
    scrollRef3: tickContainerRef,
  } = useSyncScroll();

  return (
    <div className="pt-4">
      <TimeList ref={timeContainerRef} />
      <HourCardList ref={hourCardContainerRef} ref2={tickContainerRef} />
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
    };

    // update scroll ref functions
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
      scrollRef1.current?.removeEventListener("scroll", updateScroll1);
      scrollRef2.current?.removeEventListener("scroll", updateScroll2);
      scrollRef3.current?.removeEventListener("scroll", updateScroll3);
    };
  }, []);

  return { scrollRef1, scrollRef2, scrollRef3 };
}
