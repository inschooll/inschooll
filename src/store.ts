import { create } from 'zustand';


type leftSidebarStore = {
  isActive: boolean,
  isMobileActive: boolean,
  setMobileActive: (isMobileActive: boolean) => void
}

export const useLeftSidebarStore = create<leftSidebarStore>((set) => ({
  isActive: true,
  isMobileActive: false,
  setActive: (isActive: boolean) => set({isActive}),
  setMobileActive: (isMobileActive: boolean) => set({isMobileActive}),
}));