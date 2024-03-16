"use client";
import React from "react";
import {
  useAutomaticScrollToMatchTickPositionUpdate,
  useLatestTickInfo,
  useUpdateDate,
  useUpdateUserScrolled,
} from "../hooks";
import CardsList from "./cards-list";
import TickTime from "./tick-time";

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
      <CardsList ref={ref1} tickPosition={tickPosition} />
      <TickTime ref={ref2} tickPosition={tickPosition} tickTime={tickTime} />
    </div>
  );
});
HourCardList.displayName = "HourCardList";
export default HourCardList;
