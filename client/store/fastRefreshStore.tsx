import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface useFastRefreshStoreType {
  currentIndex: number;
  incrementCurrentIndex: () => void;
  decrementCurrentIndex: () => void;
  overwriteCurrentIndex: (newState: number) => void;
}

// to change
// currentIndex
// setCurrentIndex

export const useFastRefreshStore = create<useFastRefreshStoreType>()(
  devtools(
    immer((set) => ({
      currentIndex: 0,
      incrementCurrentIndex: () =>
        set(
          produce((state) => {
            state.currentIndex++;
          }),
          false,
          "incrementCurrentIndex"
        ),
      decrementCurrentIndex: () =>
        set(
          produce((state) => {
            state.currentIndex--;
          }),
          false,
          "decrementCurrentIndex"
        ),
      overwriteCurrentIndex: (newState) =>
        set({ currentIndex: newState }, false, "overwriteCurrentIndex"),
    }))
  )
);
