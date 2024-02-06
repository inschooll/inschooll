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