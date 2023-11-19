import { create } from 'zustand';

export type popupType = {text: string, type?: "error" | "default" | "warning" | "success"};

interface Popup {
  popups: popupType[];
  addPopup: (message: popupType) => void;
  reset: () => void;
}

// This store allows us display popups using the root layout.tsx file in the /app directory
// so whenever we add a pop up here it, some code in the layout runs to show a pop up with the message of the popup and the type as well
export const usePopUpStore = create<Popup>()((set) => ({
  popups: [],
  addPopup: (newMsg) => set((store) => {
    const startSize = store.popups.length;
    setTimeout(() => {
      const currentSize = store.popups.length;
      // reset popups list if it doesn't change after 1 minute
      if (startSize === currentSize) store.reset();
    }, 60_000);
    return {popups: [newMsg, ...store.popups]};
  }),
  reset: () => set(() => ({popups: []}))
}));