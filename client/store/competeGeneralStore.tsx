"use client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { produce } from "immer";
import { letterType } from "@/types/textArray";

export type requestState = "PENDING" | "ACCEPTED" | "REJECTED";
export type testState = "IDLE" | "WAITING" | "RUNNING";
export type othersCursorType = { username: string; index: number };

export type useCompeteGeneralStoreType = {
  username: string | null;
  setUsername: (newUsername: string) => void;

  text: string | null;
  setText: (newState: string | null) => void;

  textArray: letterType[];
  pushTextArray: (newObj: letterType) => void;
  replaceTextArray: (newState: letterType[]) => void;

  setTextArray: (
    ValueOrUpdater:
      letterType[]
      | ((currentState: letterType[]) => letterType[])
  ) => void;

  iStartedTest: boolean;
  setIStartedTest: (newState: boolean) => void;

  requestState: requestState;
  setRequestState: (newState: requestState) => void;

  testState: testState;
  setTestState: (newState: testState) => void;

  currentIndex: number;
  getCurrentIndex: () => number;
  incrementCurrentIndex: () => void;
  decrementCurrentIndex: () => void;
  resetCurrentIndex: () => void;

  othersCursor: othersCursorType[];
  mutateOthersCursor: (appendState: othersCursorType) => void;
  clearOthersCursor: () => void;

  requestValidity: number;

  testDuration: number;

  testDurationCompleted: number;
  incrementTestDurationCompleted: (newState: number) => void;
  resetTestDurationCompleted: () => void;
};

export const useCompeteGeneralStore = create<useCompeteGeneralStoreType>()(
  devtools(
    //
    (set) => ({
      username: null,
      setUsername: (newState) =>
        set({ username: newState }, false, "setUsername"),
      text: null,
      setText: (newState) => set({ text: newState }, false, "setText"),

      textArray: [],
      pushTextArray: (newObj: letterType) => {
        const storeState: useCompeteGeneralStoreType =
          useCompeteGeneralStore.getState();
        // (state) => ({ textArray: [...state.textArray, newObj] })
        set(
          { textArray: [...storeState.textArray, newObj] },
          false,
          "pushTextArray"
        );
      },
      replaceTextArray: (newState: letterType[]) =>
        set({ textArray: newState }, false, "replaceTextArray"),
      // completely replicated the functionality of a setState function of  useState hook
      // by default the state passed into the callBack fn it immutable unlike useState
      // so we need to spread and dereference the state wherever we need to alter the prev array
      setTextArray: (
        ValueOrUpdater:
          | letterType[]
          | ((currentState: letterType[]) => letterType[])
      ) => {
        set(
          (state) => {
            const newValue =
              typeof ValueOrUpdater == "function"
                ? ValueOrUpdater(state.textArray)
                : ValueOrUpdater;
            return { textArray: newValue };
          },
          false,
          "setTextArray"
        );
      },

      iStartedTest: false,
      setIStartedTest: (newState) =>
        set({ iStartedTest: newState }, false, "setIsStarted"),

      requestState: "REJECTED",
      setRequestState: (newState) =>
        set({ requestState: newState }, false, "setRequestState"),

      testState: "IDLE",
      setTestState: (newState) =>
        set({ testState: newState }, false, "setTestState"),

      currentIndex: 0,
      // getCurrentIndex is made to prevent a situation of closure in javascript.
      // i will try to solve this when i reformat the code
      getCurrentIndex: () => {
        const storeState: useCompeteGeneralStoreType =
          useCompeteGeneralStore.getState();
        return storeState.currentIndex;
      },
      incrementCurrentIndex: () =>
        set(
          produce((store) => {
            store.currentIndex++;
          }),
          false,
          "incrementCurrenIndex"
        ),
      decrementCurrentIndex: () =>
        set(
          produce((store) => {
            store.currentIndex--;
          }),
          false,
          "decrementCurrenIndex"
        ),
      resetCurrentIndex: () =>
        set({ currentIndex: 0 }, false, "resetCurrentIndex"),

      othersCursor: [],
      mutateOthersCursor: (appendState: othersCursorType) =>
        set(
          (store) => {
            // did this so that i can create a new reference for the array
            const otherCursorArray = [...store.othersCursor];

            const objIndex = otherCursorArray.findIndex(
              (item) => item.username == appendState.username
            );

            if (objIndex == -1) {
              // push the object in the array
              otherCursorArray.push(appendState);
            } else {
              // change the index of the existing object
              // otherCursorArray[objIndex].index = appendState.index;
              console.log("error2");
              const updatedObj = {
                ...otherCursorArray[objIndex],
                index: appendState.index,
              };
              // Replace the object in the array at the given index
              otherCursorArray[objIndex] = updatedObj;
            }
            otherCursorArray.sort((a, b) => b.index - a.index);
            return { othersCursor: otherCursorArray };
          },
          false,
          "mutateOthersCursor"
        ),
      clearOthersCursor: () =>
        set({ othersCursor: [] }, false, "clearOthersCursor"),

      requestValidity: 15,

      testDuration: 30,

      testDurationCompleted: 0,
      incrementTestDurationCompleted: () =>
        set(
          produce((store) => {
            store.testDurationCompleted++;
          }),
          false,
          "incrementTestDurationCompleted"
        ),
      resetTestDurationCompleted: () =>
        set({ testDurationCompleted: 0 }, false, "resetTestDurationCompleted"),
    })
  )
);
