import { create } from 'zustand';

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