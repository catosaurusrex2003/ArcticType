"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface modeState {
  mode: "time" | "zen";
  setMode: (newState: "time" | "zen") => void;
  timeMode: {
    punctuation: boolean;
    number: boolean;
  };
  setTimeMode: (toggleWhat: "punctuation" | "number") => void;
  textCategory:"english"|"webdev";
  setTextCategory:(newState:"english"|"webdev")=>void
  timeOffset: number;
  setTimeOffset: (newtimeOffset: number) => void;
}

export const useModeStore = create<modeState>()(
  devtools((set) => ({
    // the mode of the test
    mode: "time",
    setMode: (newState: "time" | "zen") => set({ mode: newState }, false),
    // the time mode of the test
    timeMode: {
      punctuation: false,
      number: false,
    },
    // function to toggle the nested object in the timeMode
    setTimeMode: (toggleWhat: "punctuation" | "number") =>
      set((state) => ({
        timeMode: {
          ...state.timeMode,
          [toggleWhat]: !state.timeMode[toggleWhat],
        },
      })),
    textCategory:"english",
    setTextCategory:(newState)=>set({textCategory:newState}),
    timeOffset: 15,
    setTimeOffset: (newtimeOffset: number) =>
      set({ timeOffset: newtimeOffset })
  }))
);
