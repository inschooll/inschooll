"use client";

import { useSyncScroll } from "../hooks";
import "../page.css";
import HourCardList from "./hour-card-list";
import TimeList from "./time-list";
import TimelineHeader from "./timeline-header";

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
