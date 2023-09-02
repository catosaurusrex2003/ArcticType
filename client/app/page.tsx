"use client";
import uuid from "react-uuid";
import SelectionModal from "./selectionModal";
import Typingdiv from "./typingdiv";
import { letterType } from "@/types/textArray";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useModeStore } from "@/store/modeStore.tsx";
import { usePerSecondStore } from "@/store/perSecondStore";
import { shallow } from "zustand/shallow";
import { useFastRefreshStore } from "@/store/fastRefreshStore";
import { useGeneralStore } from "@/store/generalStore";
import { whatLength, whatMode } from "@/utils/what";
import getText from "@/utils/getText";

export default function Home() {
  const [mode, timeMode, textCategory, timeOffset, restest] = useModeStore(
    (store) => [
      store.mode,
      store.timeMode,
      store.textCategory,
      store.timeOffset,
      store.retest,
    ],
    shallow
  );

  const [overwritePerSecondState, overwritePerSecondStatsArray] =
    usePerSecondStore(
      (store) => [
        store.overwritePerSecondState,
        store.overwritePerSecondStatsArray,
      ],
      shallow
    );

  const [text, setText] = useGeneralStore((store) => [
    store.text,
    store.setText,
  ]);

  const overwriteCurrentIndex = useFastRefreshStore(
    (store) => store.overwriteCurrentIndex
  );

  const [textArray, setTextArray] = useState<letterType[]>([]);
  const [linesCompleted, setLinesCompleted] = useState<number>(0);

  useEffect(() => {
    // const tempText = selectSentences(text);
    const tempText = text;
    setTextArray([]);
    overwriteCurrentIndex(0);
    tempText.split("").map((each) => {
      const cache1 = uuid();
      setTextArray((prev) => [
        ...prev,
        {
          id: cache1,
          letter: each,
          state: "pending",
          hidden: false,
          linebreak: false,
        },
      ]);
    });
  }, [text, linesCompleted]);

  const getRequiredText = async () => {
    // conditions for which type of text to fetch
    if (!restest) {
      if (mode == "time") {
        const text = await getText({
          cat: textCategory,
          type: whatMode(timeMode),
          length: whatLength(timeOffset),
        });
        setText(text);
      } else {
        const text = await getText({
          cat: textCategory,
          type: "basic",
          length: whatLength(timeOffset),
        });
        setText(text)
      }
    }
  };

  useEffect(() => {
    // clearing cache
    overwritePerSecondStatsArray([]);
    overwritePerSecondState({
      correct: 0,
      wrong: 0,
    });
    getRequiredText()
  }, [timeMode, textCategory, timeOffset]);

  useEffect(() => {
    // initialize current index to 0
    overwriteCurrentIndex(0);
  }, []);

  return (
    <div className="">
      <Toaster />
      <SelectionModal />
      <Typingdiv
        textArray={textArray}
        setTextArray={setTextArray}
        setLinesCompleted={setLinesCompleted}
      />
    </div>
  );
}
