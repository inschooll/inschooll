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

export const getNumberPrefix = (value: number) => {

  switch (value) {
    case 1:
      return '1st';
    case 2:
      return '2nd';
    case 3:
      return '3rd';
    default:
      return value + 'th';
  }
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
 * @returns if value is 0, 1, ... 9, it suffixes 0 giving you 00, 01, ..., 09
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