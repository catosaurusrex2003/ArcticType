"use client";
import uuid from "react-uuid";
import SelectionModal from "./selectionModal";
import Typingdiv from "./typingdiv";
import { letterType } from "@/types/textArray";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";
import { useModeStore } from "@/store/modeStore.tsx";
import { usePerSecondStore } from "@/store/perSecondStore";
import { shallow } from "zustand/shallow";
import { useFastRefreshStore } from "@/store/fastRefreshStore";
import { useGeneralStore } from "@/store/generalStore";

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

  const [charIdArr, setCharIdArr] = useState<string[]>([]);
  const [textArray, setTextArray] = useState<letterType[]>([]);
  const [linesCompleted, setLinesCompleted] = useState<number>(0);

  useEffect(() => {
    // const tempText = selectSentences(text);
    const tempText = text;
    setCharIdArr([]);
    setTextArray([]);
    overwriteCurrentIndex(0);
    tempText.split("").map((each) => {
      const cache1 = uuid();
      setCharIdArr((prev) => [...prev, cache1]);
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

  // fetch text from backend
  const getText = async (payload: {
    cat: "english" | "webdev";
    type: "basic" | "punc" | "num" | "both";
    length: Number;
  }) => {
    try {
      const result = await axios.post(
        `/api/getText`,
        payload,
        {
          withCredentials: true,
        }
      );
      if (result.status == 200) {
        setText(result.data.text)
        console.log(result.data.text)
      }
    } catch (err) {
      console.log(err);
    }
  };

  const whatLength = (timeOffset: number) => {
    if (timeOffset == 15) {
      return 10;
    } else if (timeOffset == 30) {
      return 20;
    } else if (timeOffset == 60) {
      return 30;
    } else {
      return 50;
    }
  };

  useEffect(() => {
    // clearing cache
    overwritePerSecondStatsArray([]);
    overwritePerSecondState({
      correct: 0,
      wrong: 0,
    });

    // conditions for which type of text to fetch
    if (!restest) {
      if (mode == "time") {
        if (!timeMode.number && !timeMode.punctuation) {
          // basic
          getText({
            cat: textCategory,
            type: "basic",
            length: whatLength(timeOffset),
          });
        } else if (timeMode.number && !timeMode.punctuation) {
          // num
          getText({
            cat: textCategory,
            type: "num",
            length: whatLength(timeOffset),
          });
        } else if (!timeMode.number && timeMode.punctuation) {
          // punc
          getText({
            cat: textCategory,
            type: "punc",
            length: whatLength(timeOffset),
          });
        } else if (timeMode.number && timeMode.punctuation) {
          // both
          getText({
            cat: textCategory,
            type: "both",
            length: whatLength(timeOffset),
          });
        }
      } else {
        getText({
          cat: textCategory,
          type: "basic",
          length: whatLength(timeOffset),
        });
      }
    }
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
        charIdArr={charIdArr}
        setLinesCompleted={setLinesCompleted}
      />
    </div>
  );
}
