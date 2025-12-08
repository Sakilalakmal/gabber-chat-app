import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("kouventa-theme") || "night",
  setTheme: (theme) => {
    set({ theme });
    localStorage.setItem("kouventa-theme", theme);
  },
}));
