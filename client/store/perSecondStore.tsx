"use client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { scoreType } from "@/types/score";
import { immer } from "zustand/middleware/immer";
import { produce } from "immer";

interface perSecondStoreType {
  perSecondState: scoreType;
  overwritePerSecondState: (newState: scoreType) => void;
  incrementPerSecondState: (incrementWhat: "correct" | "wrong") => void;
  perSecondStatsArray: scoreType[];
  appendPerSecondStatsArray: () => void;
  overwritePerSecondStatsArray: (newState: scoreType[]) => void;
}

// to change
// perSecondState
// setPerSecondState
// perSecondStatsArray
// setPerSecondStatsArray

export const usePerSecondStore = create<perSecondStoreType>()(
  devtools(
    immer((set) => ({
      perSecondState: {
        correct: 0,
        wrong: 0,
      },
      // overwrites the perSecondState. Mostly will be used to clear the state every second.
      overwritePerSecondState: (newState) =>
        set({ perSecondState: newState }, false, "overwritePerSecondState"),
      // to increment the correct or wrong in perSecondState
      incrementPerSecondState: (incrementWhat) =>
        set(
          produce((state) => {
            state.perSecondState[incrementWhat] += 1;
          }),
          false,
          "incrementPerSecondState"
        ),
      perSecondStatsArray: [
        // {correct:2,wrong:5},
        // {correct:3,wrong:2},
        // {correct:2,wrong:5},
        // {correct:3,wrong:2},
        // {correct:2,wrong:1},
        // {correct:3,wrong:2},
        // {correct:2,wrong:5},
        // {correct:3,wrong:2},
        // {correct:2,wrong:1},
        // {correct:3,wrong:2},
        // {correct:2,wrong:5},
        // {correct:2,wrong:5},
        // {correct:2,wrong:1},
        // {correct:3,wrong:2},
        // {correct:2,wrong:1}
      ],
      // append the current perSecondState to the Array
      appendPerSecondStatsArray: () =>
        set(
          produce((state) => {
            state.perSecondStatsArray.push(state.perSecondState);
          }),
          false,
          "appendPerSecondStatsArray"
        ),
      // overwrite perSecondStatsArray, mostly will be used to clear it
      overwritePerSecondStatsArray: (newState) =>
        set(
          { perSecondStatsArray: newState },
          false,
          "overwritePerSecondStatsArray"
        ),
    }))
  )
);
