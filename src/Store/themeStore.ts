import { create } from "zustand";

type TTheme = "light" | "dark";

interface IThemeState {
  theme: TTheme;
  setTheme: (theme: TTheme) => void;
}

export const useThemeStore = create<IThemeState>()((set) => ({
  theme: "dark",
  setTheme: (theme: TTheme) => set({ theme }),
}));
