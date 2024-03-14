"use client";
import { useEffect, useState } from "react";
import { setInterval } from "timers";
import {
  convert12HourFormatTo24HourFormat,
  convert24hrFormatTo12hrFormat,
  currentHourMinuteSeconds,
  getMeridiem,
} from "~/lib/utils";
import { useDateStore, useTimelineStore } from "~/store";
import {
  HOUR_CARD_SIZE,
  SECONDS_PER_MINUTE,
} from "./components/hour-card-list";

type TTickTime = { hour: number; minute: number; meridiem: "am" | "pm" };

/**
 * This calculates where the tick scroll position should be and also what
 * the tick time is using the 12-hour format.
 * @returns tickPosition and tickTime
 */
export function useLatestTickInfo() {
  // tick is the line indicating the current time of the day
  const [tickTime, setTickTime] = useState<TTickTime>();
  const [tickPosition, setTickPosition] = useState<number>();

  useEffect(() => {
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

    const cb = () => {
      // update tick time
      const { hour, minute, seconds } = currentHourMinuteSeconds();
      const formattedHour = convert24hrFormatTo12hrFormat(hour);
      setTickTime({ hour: formattedHour, minute, meridiem: getMeridiem(hour) });

      // update tick position
      const totalMinutesSoFar = getTotalMinutes(hour, minute);
      updateTickPosition(totalMinutesSoFar);

      console.log(hour, ":", minute, ":", seconds);
    };
    // set initial tickPosition
    cb();

    // seconds left to the next minute
    const { seconds } = currentHourMinuteSeconds();
    const secondsLeft = SECONDS_PER_MINUTE - seconds;

    // update tick position the next time seconds turn to 00
    // e.g 5:57, 5:58, 5:59, 6:00(UPDATE)
    const timeoutId = setTimeout(() => {
      cb();

      const intervalId = setInterval(cb, SECONDS_PER_MINUTE * 1000);
      return () => clearInterval(intervalId);
    }, secondsLeft * 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return { tickPosition, tickTime };
}

/**
 * This hook simply updates the timelines scroll position to continuously follow the tick keeping it in view as the tickTime changes
 * @param tickTime this runs a useEffect whenever it changes, which then updates the div scroll position
 * @param tickPosition this is the current position of the tick and it is used by this hook to know where to scroll the div scrollable element to
 * @param div this is the scrollable element
 */
export function useAutomaticScrollToMatchTickPositionUpdate(
  tickTime: TTickTime | undefined,
  tickPosition: number | undefined,
  div: HTMLDivElement,
) {
  // This disables this feature if the user has scrolled
  const userHasScrolled = useTimelineStore(state => state.userScrolled);

  useEffect(() => {
    if (!tickTime || !tickPosition) return;
    if (!div) return;
    // if user has scrolled, this feature is disabled
    if (userHasScrolled) return;

    // TODO: consider the presence of the left and right sidebar

    // stay 1 card behind tick for smaller screens
    if (window.innerWidth <= 800) {
      div.scrollLeft = tickPosition - HOUR_CARD_SIZE;
      return;
    }

    // hour (24-hour format)
    const hour = convert12HourFormatTo24HourFormat(
      tickTime.hour,
      tickTime.meridiem,
    );

    // fix scroll at 0am(12am)
    if (hour >= 0 && hour < 6) {
      div.scrollLeft = 0;
    }
    // fix scroll at 8am
    else if (hour >= 10 && hour < 18) {
      div.scrollLeft = HOUR_CARD_SIZE * 4;
    }
    // stay 2 cards behind tick
    else {
      div.scrollLeft = tickPosition - HOUR_CARD_SIZE * 2;
    }
  }, [div, tickPosition, tickTime]);
}

/**
 * This function listens to tickTime which is the current hour and minute of
 * the day and whenever the hour is 0, and the minute is 0 (which indicates a new
 * day), the zustand date store will be updated to hold data on the new day. 😁
 * @param tickTime The time used to know if we are in a new day or not
 */
export function useUpdateDate(tickTime: TTickTime | undefined) {
  const updateDate = useDateStore((state) => state.updateDate);

  useEffect(() => {
    if (!tickTime) return;
    // update date store if it is a new day
    const hour = convert12HourFormatTo24HourFormat(
      tickTime.hour,
      tickTime.meridiem,
    );
    const { minute } = tickTime;

    if (hour === 0 && minute === 0) {
      updateDate();
    }
  }, [tickTime, updateDate]);
}

/**
 * This hook checks if a user has scrolled through the timeline,
 * if they have, it updates the zustand store to userScrolled true
 * and if not userScrolled remains false
 * @param scrollPosition The current scroll position of the timeline
 * hour card scroll list
 */
export function useUpdateUserScrolled(scrollPosition: number | null) {
  const [lastScrollPosition, setLastScrollPosition] = useState<number | null>(
    null,
  );
  const [disableEffect, setDisableEffect] = useState<boolean>(false);
  const { userScrolled, updateUserScrolled } = useTimelineStore();

  // check to see if user scrolled, if they did then update
  // store to userScrolled = true
  useEffect(() => {
    console.log("Did user scroll? 😕");
    // if user already scrolled no need to run the code below
    if (userScrolled) return;

    // run code below
    if (!scrollPosition) return;
    if (disableEffect) return;
    setLastScrollPosition(scrollPosition);
    if (!lastScrollPosition) return;

    setDisableEffect(true);
    const timerId = setTimeout(() => {
      const scrollDiff = Math.abs(scrollPosition - lastScrollPosition);
      if (scrollDiff > 5) {
        console.log("USER SCROLLED!!!");
        updateUserScrolled(true);
      }
      setDisableEffect(false);
      clearTimeout(timerId);
    }, 1000);
    setLastScrollPosition(scrollPosition);
  }, [
    disableEffect,
    lastScrollPosition,
    scrollPosition,
    updateUserScrolled,
    userScrolled,
  ]);
}
