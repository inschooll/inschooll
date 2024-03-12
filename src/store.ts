import { create } from 'zustand';


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