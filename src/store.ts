import { create } from 'zustand';
import { currentDayName, currentMonthName } from './lib/utils';

// Main sidebar
type leftSidebarStore = {
  isActive: boolean,
  isMobileActive: boolean,
  setIsActive: (isActive: boolean) => void
  setMobileIsActive: (isMobileActive: boolean) => void
}
export const useLeftSidebarStore = create<leftSidebarStore>((set) => ({
  isActive: true,
  isMobileActive: false,
  setIsActive: (isActive: boolean) => set({isActive}),
  setMobileIsActive: (isMobileActive: boolean) => set({isMobileActive}),
}));

// Dashboard right sidebar
type rightDashboardSidebarStore = {
  isActive: boolean,
  isMobileActive: boolean,
  setIsActive: (isActive: boolean) => void
  setMobileIsActive: (isMobileActive: boolean) => void
}
export const useRightDashboardSidebarStore = create<rightDashboardSidebarStore>((set) => ({
  isActive: true,
  isMobileActive: false,
  setIsActive: (isActive: boolean) => set({isActive}),
  setMobileIsActive: (isMobileActive: boolean) => set({isMobileActive}),
}));

// Current date
type dateStore = {
  dayName: string,
  day: number,
  month: string,
  updateDate: () => void
}
/**
 * This is a zustand state management store that keeps track of 
 * the current dates day (e.g 11th), day name (e.g Monday) and month (e.g 
 * Wednesday)
 */
export const useDateStore = create<dateStore>((set) => ({
  day: new Date().getDate(),
  dayName: currentDayName(),
  month: currentMonthName(),
  updateDate: () => {
    set({day: new Date().getDate(), month: currentMonthName(), dayName: currentDayName()})
  }
}))

// User Scrolled
type timelineStore = {
  userScrolled: boolean,
  updateUserScrolled: (scrolled: boolean) => void
}

/**
 * This store helps keep track of whether or not a user scrolled 
 * through their timeline (Timeline is a feature on the dashboard that 
 * shows a list of hours card - it holds events a user has for the day,
 * events such as classes, meetings and co)
*/
export const useTimelineStore = create<timelineStore>((set) => ({
  userScrolled: false,
  updateUserScrolled: (scrolled: boolean) => set({userScrolled: scrolled})
}));