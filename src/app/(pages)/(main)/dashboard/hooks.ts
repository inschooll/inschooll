"use client";
import { useEffect, useRef, useState } from "react";
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
import { type TTickTime } from "~/lib/types";


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
  }, [div, tickPosition, tickTime, userHasScrolled]);
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



/**
 * This hook basically ensures the scroll position of ref1, ref2 and ref3 stay in sync.
 * If one ref scolls, the other 2 scroll to match (sync with) it
 *
 * @returns scrollRef1, scrollRef2
 */
export function useSyncScroll() {
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

      // console.log(`scrollLeft: ${scrollLeft}`);
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
