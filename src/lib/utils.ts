import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getLevelTitle = (value: number) => {
  switch (value) {
    case 1:
      return "100 level";
    case 2:
      return "200 level";
    case 3:
      return "300 level";
    case 4:
      return "400 level";
    case 5:
      return "500 level";
    case 6:
      return "600 level";
    case 7:
      return "700 level";
    case 8:
      return "800 level";
    default:
      return "unknown level";
  }
};

/**
 * Takes a number and returns that number prefixed with 'st', 'nd', 'rd', 'th' etc
 * @param value 
 * @returns e.g 1st, 2nd, 3rd, 4th ...
 */
export const numberPositionPrefix = (value: number) => {
  if (value === 1) return value + 'st';
  if (value === 2) return value + 'nd';
  if (value === 3) return value + 'rd';
  if (value >= 4 && value <=  20) return value + 'th';
  if (value % 10.5 ===  0) return value + 'st';
  if (value % 11 ===  0) return value + 'nd';
  if (value % 11.5 ===  0) return value + 'rd';
  return value + 'th';
}

export const roundFloat = (value: number, round=1) => {
  const result = Math.ceil(value * 10) / 10
  return result.toFixed(round);
}

export const currentHourMinuteSeconds = () => {
  const date = new Date();
  
  return {
    hour: date.getHours(),
    minute: date.getMinutes(),
    seconds: date.getSeconds(),
  }
}

/**
 * pads 0 to the start and returns it only if value is less than 10
 * @param value the number value to be padded e.g 1 -> 01
 * @returns if value is 0, 1, ... 9, it prefixes 0 giving you 00, 01, ..., 09
 */
export const formatTimePadStart = (value: number) => {
  return value.toString().padStart(2, "0")
}

export const currentDayName = () => {
  const currentDate = new Date();
  const dayName = new Intl.DateTimeFormat("en-US", {weekday: "long"}).format(currentDate)
  return dayName
}

export const currentMonthName = () => {
  const currentDate = new Date();
  const monthName = new Intl.DateTimeFormat("en-US", {month: "long"}).format(currentDate)
  return monthName
}

/**
 * prefixes 'st', 'nd', 'rd', or 'th' based on the day 
 * e.g 1, 2, 3 ..., 31 would result in 1st, 2nd, 3rd, ..., 31st
 * @param day the particular day 
 * @returns 
 */
export const getDaySuffix = (day: number): string => {
  if (day >= 11 && day <= 13) {
    return `${day}th`; // Special case for 11th, 12th, and 13th
  }

  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
};

/**
 * This function takes in an hour (24-hour format) and 
 * it finds the meridiem(or "am" | "pm") of the hour
 * @param hour is the 24-hour format
 * @returns either "am" or "pm"
 */
export const getMeridiem = (hour: number) => {
  return hour < 12 ? "am" : "pm";
}

export const convert24hrFormatTo12hrFormat = (hour: number) => {
  return hour % 12 === 0 ? 12 : hour % 12;
}

/**
 * This util function converts 12 hour format to 24 hour format hour and returns the hour
 * @param hour The 12-hour format hour to be converted
 * @param meridiem The meridiem is either "am" or "pm"
 * @returns 24-hour hour format e.g  5pm --> 17
 */
export const convert12HourFormatTo24HourFormat = (hour: number, meridiem: "am" | "pm") => {
  if (meridiem === "am" && hour === 12) return 0;
  if (meridiem === "pm" && hour === 12) return 12;
  if (meridiem === "am") return hour;
  else return hour+12;
}

export const getStartEndDateRange = (start: Date, end: Date) => {
  const startHr_24HrFormat = start.getHours();
  const startHour = convert24hrFormatTo12hrFormat(startHr_24HrFormat);
  const startMinute = start.getMinutes();
  
  const endHr_24HrFormat = end.getHours();
  const endHour = convert24hrFormatTo12hrFormat(endHr_24HrFormat);
  const endMinute = end.getMinutes();

  // meridiem
  const meridiem = endHr_24HrFormat < 12 ? "AM" : "PM";

  return `${startHour}:${formatTimePadStart(startMinute)} - ${endHour}:${formatTimePadStart(endMinute)} ${meridiem}`
}


export const getAcronym = (name?: string, limit=3) => {
  if (name && name.length <= limit) return name.toUpperCase();
  // e.g input -> Bingham Nestle school
  //     output -> BNU
  return name
    ?.split(" ")
    .map((value, i) => (i < limit ? value[0] : ""))
    .join("")
    .toUpperCase();
};

export const setTheme = (theme: "dark" | "light" | "system") => {
  document.cookie = `theme=${theme}`;
  const htmlTag = document.querySelector("html");
  htmlTag?.setAttribute("data-theme", theme);
}

export const getTheme = () => {
  const htmlTag = document.querySelector("html");
  const theme = htmlTag?.getAttribute("data-theme");
  return theme;
}