"use client";
import { scoreType } from "@/types/score";
import { timeModeType } from "@/types/misc";
import React, { createContext, useContext, useEffect, useState } from "react";

type GlobalContextType = {
  perSecondStatsArray: scoreType[];
  setPerSecondStatsArray: React.Dispatch<React.SetStateAction<scoreType[]>>;
  perSecondState: scoreType;
  setPerSecondState: React.Dispatch<React.SetStateAction<scoreType>>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  timeOffset: number;
  setTimeOffset: React.Dispatch<React.SetStateAction<number>>;
  mode: "time" | "zen";
  setMode: React.Dispatch<React.SetStateAction<"time" | "zen">>;
  timeMode :timeModeType,
  setTimeMode:React.Dispatch<React.SetStateAction<timeModeType>>
};

const GlobalContext = createContext<GlobalContextType>({
  perSecondStatsArray: [],
  setPerSecondStatsArray: () => {},
  perSecondState: {
    correct: 0,
    wrong: 0,
  },
  setPerSecondState: () => {},
  currentIndex: 0,
  setCurrentIndex: () => {},
  timeOffset: 30,
  setTimeOffset: () => {},
  mode: "time",
  setMode: () => {},
  timeMode:{
    punctuation: false,
    numbers: false
  },
  setTimeMode:()=>{}
});

type GLobalProviderProp = {
  children: React.ReactNode;
};

export const GlobalContextProvider = ({ children }: GLobalProviderProp) => {
  // array of stats per second
  const [perSecondStatsArray, setPerSecondStatsArray] = useState<scoreType[]>([
    { correct: 1, wrong: 2 },
    { correct: 2, wrong: 2 },
    { correct: 1, wrong: 3 },
    { correct: 3, wrong: 0 },
    { correct: 4, wrong: 0 },
    { correct: 2, wrong: 1 },
    { correct: 1, wrong: 2 },
    { correct: 2, wrong: 2 },
    { correct: 1, wrong: 3 },
    { correct: 3, wrong: 0 },
    { correct: 4, wrong: 0 },
    { correct: 1, wrong: 2 },
    { correct: 2, wrong: 2 },
    { correct: 1, wrong: 3 },
    { correct: 3, wrong: 0 },
    { correct: 4, wrong: 0 },
    { correct: 1, wrong: 2 },
    { correct: 2, wrong: 2 },
    { correct: 1, wrong: 3 },
    { correct: 3, wrong: 0 },
    { correct: 4, wrong: 0 },
    { correct: 1, wrong: 2 },
    { correct: 2, wrong: 2 },
    { correct: 1, wrong: 3 },
    { correct: 3, wrong: 0 },
    { correct: 4, wrong: 0 },
    { correct: 1, wrong: 2 },
    { correct: 2, wrong: 2 },
    { correct: 1, wrong: 3 },
    { correct: 3, wrong: 0 },
    { correct: 4, wrong: 0 },
    { correct: 1, wrong: 2 },
    { correct: 2, wrong: 2 },
    { correct: 1, wrong: 3 },
    { correct: 3, wrong: 0 },
    { correct: 4, wrong: 0 },
    { correct: 1, wrong: 2 },
    { correct: 2, wrong: 2 },
    { correct: 1, wrong: 3 },
    { correct: 3, wrong: 0 },
    { correct: 4, wrong: 0 },
    { correct: 1, wrong: 2 },
    { correct: 2, wrong: 2 },
    { correct: 1, wrong: 3 },
    { correct: 3, wrong: 0 },
    { correct: 4, wrong: 0 },
    { correct: 1, wrong: 2 },
    { correct: 2, wrong: 2 },
    { correct: 1, wrong: 3 },
    { correct: 3, wrong: 0 },
    { correct: 4, wrong: 0 },
    { correct: 1, wrong: 2 },
    { correct: 2, wrong: 2 },
    { correct: 1, wrong: 3 },
    { correct: 3, wrong: 0 },
    { correct: 4, wrong: 0 },
    { correct: 1, wrong: 2 },
    { correct: 2, wrong: 2 },
    { correct: 1, wrong: 3 },
    { correct: 3, wrong: 0 },
    { correct: 4, wrong: 0 },
    { correct: 1, wrong: 2 },
    { correct: 2, wrong: 2 },
    { correct: 1, wrong: 3 },
    { correct: 3, wrong: 0 },
    { correct: 4, wrong: 0 },
    { correct: 2, wrong: 1 },
    { correct: 1, wrong: 2 },
    { correct: 2, wrong: 2 },
    { correct: 1, wrong: 3 },
    { correct: 3, wrong: 0 },
    { correct: 4, wrong: 0 },
    { correct: 1, wrong: 2 },
    { correct: 2, wrong: 2 },
    { correct: 1, wrong: 3 },
    { correct: 3, wrong: 0 },
    { correct: 4, wrong: 0 },
    { correct: 1, wrong: 2 },
    { correct: 2, wrong: 2 },
    { correct: 1, wrong: 3 },
    { correct: 3, wrong: 0 },
    { correct: 4, wrong: 0 },
    { correct: 1, wrong: 2 },
    { correct: 2, wrong: 2 },
    { correct: 1, wrong: 3 },
    { correct: 3, wrong: 0 },
    { correct: 4, wrong: 0 },
    { correct: 1, wrong: 2 },
    { correct: 2, wrong: 2 },
    { correct: 1, wrong: 3 },
    { correct: 3, wrong: 0 },
    { correct: 4, wrong: 0 },
    { correct: 1, wrong: 2 },
    { correct: 2, wrong: 2 },
    { correct: 1, wrong: 3 },
    { correct: 3, wrong: 0 },
    { correct: 4, wrong: 0 },
    { correct: 1, wrong: 2 },
    { correct: 2, wrong: 2 },
    { correct: 1, wrong: 3 },
    { correct: 3, wrong: 0 },
    { correct: 4, wrong: 0 },
    { correct: 1, wrong: 2 },
    { correct: 2, wrong: 2 },
    { correct: 1, wrong: 3 },
    { correct: 3, wrong: 0 },
    { correct: 4, wrong: 0 },
    { correct: 1, wrong: 2 },
    { correct: 2, wrong: 2 },
    { correct: 1, wrong: 3 },
    { correct: 3, wrong: 0 },
    { correct: 4, wrong: 0 },
    { correct: 1, wrong: 2 },
    { correct: 2, wrong: 2 },
    { correct: 1, wrong: 3 },
    { correct: 3, wrong: 0 },
    { correct: 4, wrong: 0 },
    { correct: 1, wrong: 2 },
    { correct: 2, wrong: 2 },
    { correct: 1, wrong: 3 },
    { correct: 3, wrong: 0 },
    { correct: 4, wrong: 0 },
  ]);
  // per second
  const [perSecondState, setPerSecondState] = useState<scoreType>({
    correct: 0,
    wrong: 0,
  });
  // index of the current typed word. Is also the position of the cursor
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // default time of the test
  const [timeOffset, setTimeOffset] = useState<number>(15);
  // mode of the test
  const [mode, setMode] = useState<"time" | "zen">("time");
  // submode of the time category
  const [timeMode, setTimeMode] = useState<timeModeType>({
    punctuation: false,
    numbers: false
  });

  return (
    <GlobalContext.Provider
      value={{
        perSecondState,
        setPerSecondState,
        perSecondStatsArray,
        setPerSecondStatsArray,
        currentIndex,
        setCurrentIndex,
        timeOffset,
        setTimeOffset,
        mode,
        setMode,
        timeMode,
        setTimeMode
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
