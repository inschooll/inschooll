"use client";
import React, { useEffect, useState } from "react";
import { HoursData } from "./timeline";
import { cn, currentHourMinuteSeconds, formatTimePadStart, roundFloat } from "~/lib/utils";
import { setInterval } from "timers";

const SECONDS_PER_MINUTE = 60;
export const HOUR_CARD_SIZE = 144;   // px

const HourCardList = React.forwardRef<HTMLDivElement, {ref2: React.RefObject<HTMLDivElement>}>(({ref2}, ref) => {
  const {tickPosition, tickTime} = useLatestTickInfo();

  return (
    <div className="">
      <div
        className="relative mt-1 flex overflow-auto rounded-lg border border-cc-border"
        ref={ref}
        style={{ scrollbarWidth: "none" }}
      >
        {HoursData.map((hour) => (
          <HourCard key={hour} />
        ))}
        <div
          className={"position absolute bottom-0 w-[1px] bg-cc-content/80"}
          style={{
            left: `${tickPosition}px`,
            height: `${HOUR_CARD_SIZE}px`
          }}
        />
      </div>
      <div className="relative h-8 bg-sky-20 overflow-auto" ref={ref2} style={{scrollbarWidth: 'none'}}>
          <div className="font-semibold" style={{width: `${HOUR_CARD_SIZE * 12}px`}}>
            <div className="absolute top-0 -translate-x-1/2" style={{left: `${tickPosition}px`,}}>
              <p className="text-sm">{formatTimePadStart(tickTime.hour)}:{formatTimePadStart(tickTime.minute)}</p>
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
    <div className="HourCardEachCvr shrink-0 border-r border-cc-border" style={{
      width: HOUR_CARD_SIZE,
      height: HOUR_CARD_SIZE,
    }} />
  );
}

function useLatestTickInfo() {
    // tick is the line indicating the current time of the day
    const [tickTime, setTickTime] = useState({hour: new Date().getHours() % 12, minute: new Date().getMinutes()});
    const [tickPosition, setTickPosition] = useState(0);
  
    const getTotalMinutes = (hours: number, minutes: number) => {
      return hours * SECONDS_PER_MINUTE + minutes;
    };
  
    const updateTickPosition = (totalMinutesSoFar: number) => {
      // calculate size of HourCardContainer
      const numberOfHourCards = 12;
      const totalHourCardContainerSize = HOUR_CARD_SIZE * numberOfHourCards;
  
      // calculate current tick position
      const totalMinutesInaDay = 60 * 24;
      const percent = totalMinutesSoFar / totalMinutesInaDay;
      const currentTickPosition = percent * totalHourCardContainerSize;
      const intResult = Math.trunc(currentTickPosition);
  
      // update tick position
      setTickPosition(intResult);
    };
  
    useEffect(() => {
      const cb = () => {
        // update tick time
        const { hour, minute, seconds } = currentHourMinuteSeconds();
        setTickTime({hour: hour%12, minute})
        
        // update tick position
        const totalMinutesSoFar = getTotalMinutes(hour, minute);
        updateTickPosition(totalMinutesSoFar);
        
        console.log(hour, ":", minute, ":", seconds);
      }
      // set initial tickPosition
      cb();
  
      // seconds left to the next minute
      const { seconds } = currentHourMinuteSeconds();
      const secondsLeft = SECONDS_PER_MINUTE - seconds;
      
      // update tick position the next [(n)hrs: 00 minutes]
      const timeoutId = setTimeout(() => {
        cb();
  
        const intervalId = setInterval(cb, SECONDS_PER_MINUTE * 1000 );
        return () => clearInterval(intervalId);
      }, secondsLeft * 1000);
      
      return () => clearTimeout(timeoutId);
    }, []);
    return {tickPosition, tickTime}
}