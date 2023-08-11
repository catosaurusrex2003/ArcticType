"use client";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { letterType } from "../types/textArray";
import MyTimer from "./timer";
import { usePerSecondStore } from "@/store/perSecondStore";
import { shallow } from "zustand/shallow";
import { useFastRefreshStore } from "@/store/fastRefreshStore";
import { useModeStore } from "@/store/modeStore";

type TypingdivProps = {
  textArray: letterType[];
  setTextArray: Dispatch<SetStateAction<letterType[]>>;
  charIdArr: string[];
  setLinesCompleted: Dispatch<SetStateAction<number>>;
};

const Typingdiv = ({ textArray, setTextArray, charIdArr }: TypingdivProps) => {
  const [mode, timeMode, textCategory, timeOffset] = useModeStore(
    (store) => [store.mode, store.timeMode, store.textCategory, store.timeOffset],
    shallow
  );

  const [currentIndex, incrementCurrentIndex, decrementCurrentIndex] =
    useFastRefreshStore(
      (store) => [
        store.currentIndex,
        store.incrementCurrentIndex,
        store.decrementCurrentIndex,
      ],
      shallow
    );

  const incrementPerSecondState = usePerSecondStore(
    (store) => store.incrementPerSecondState
  );

  // the state wether to focus or not
  const [focusStatus, setFocusState] = useState<Boolean>(true);
  // ids of the spans which wrap in the div
  const [wrapSpanIds, setWrapSpanIds] = useState<string[]>();
  // example 28px
  const [currentLineHeight, setCurrenLineHeight] = useState<number>(32);
  // doesnt need to be global. depicts if the test is started or not
  const [started, setStarted] = useState(false);
  // numbers of lines-height distance scrolled. used in divRef.current.scrollTop]
  const lineScrolled = useRef<number>(1);
  // the container div of all the spans
  const focusRef = useRef<HTMLDivElement>(null!);

  // sets the state for stats of each second
  const handlePerSecondStats = (params: 1 | 0) => {
    incrementPerSecondState(params ? "correct" : "wrong");
  };

  const scrollOneLine = () => {
    console.log("one line scrolled")
    focusRef.current.scrollTop = currentLineHeight * lineScrolled.current;
    lineScrolled.current += 1;
  };

  useEffect(() => {
    setStarted(false)
  }, [mode, timeMode, textCategory, timeOffset])
  

  const handleKeyboardEvent = (event: any) => {
    event.preventDefault();
    const key = event.key;
    const alphanumericRegex = /^[a-zA-Z0-9.,'";:?)(*&%$#@!|/^]$/;
    // check regex
    if (key.match(alphanumericRegex) || key === " " || key === "Backspace") {
      setStarted(true);
      if (key === "Backspace") {
        if (currentIndex !== 0) {
          setTextArray((prev) => {
            // find the object of the letter
            const obj = prev.find(
              (each) => each.id == charIdArr[currentIndex - 1]
            );
            // change the state of letter to pending in the array
            if (obj) {
              obj.state = "pending";
              prev[currentIndex - 1] = obj;
            }
            return prev;
          });
          decrementCurrentIndex();
        }
      } else {
        setTextArray((prev) => {
          // find the object of the letter
          const obj = prev.find((each) => each.id === charIdArr[currentIndex]);
          if (obj) {
            // if correct change state
            if (obj.letter == key) {
              obj.state = "correct";
              prev[currentIndex] = obj;
              handlePerSecondStats(1);
            } else {
              obj.state = "wrong";
              prev[currentIndex] = obj;
              handlePerSecondStats(0);
            }
            if (wrapSpanIds) {
              // linescrolled.current starts from 1. i have purposely not put linescrolled.current-1 below.
              // so that it starts scrolling from the second line
              if (obj.id == wrapSpanIds[lineScrolled.current]) {
                scrollOneLine();
              }
            }
          }
          return prev;
        });
        incrementCurrentIndex();
      }
    }
  };

  const handleFocus = (focusState: 0 | 1) => {
    if (focusState) {
      setFocusState(true);
    } else {
      setFocusState(false);
    }
  };

  useEffect(() => {
    handleFocus(0);
  }, [textCategory, timeMode]);

  useEffect(() => {
    const spans = Array.from(focusRef.current.getElementsByTagName("span"));
    // temp variable. dont want to increase number of set action.
    const wrappingSpanArr: string[] = [];
    // capturing the span elements on which the line wraps
    for (let i = 0; i < spans.length - 1; i++) {
      const spanRectCurrent = spans[i].getBoundingClientRect();
      const spanRectNext = spans[i + 1].getBoundingClientRect();
      if (spanRectCurrent.right > spanRectNext.right) {
        wrappingSpanArr.push(spans[i].id);
      }
    }
    setWrapSpanIds(wrappingSpanArr);

    // set the line height
    if (spans.length > 0) {
      const style = window.getComputedStyle(spans[0]);
      setCurrenLineHeight(parseInt(style.getPropertyValue("line-height"), 10));
    }
  }, [focusRef.current, textArray]);

  return (
    <div className="flex flex-col mt-8 md:h-64 justify-center items-center relative">
      {started && (
        <div className="flex w-4/5 sm:w-3/4">
          <div className="mr-auto">
            <MyTimer />
          </div>
        </div>
      )}
      <div
        className={`typing-div-focus w-4/5 sm:w-3/4 h-20 sm:h-24   overflow-hidden text-justify select-none border-none focus:outline-none ${
          focusStatus ? null : "blur-div cursor-pointer "
        }`}
        ref={focusRef}
        tabIndex={0}
        onKeyDown={handleKeyboardEvent}
        onBlur={() => handleFocus(0)}
        onFocus={() => handleFocus(1)}
      >
        {textArray.map((character) => (
          <span
            id={character.id}
            key={character.id}
            className={` text-lg sm:text-2xl select-none border-none overflow-y-scroll
                    ${
                      charIdArr[currentIndex] == character.id
                        ? "blinking-cursor"
                        : null
                    }
                    ${
                      character.state == "correct"
                        ? "text-white"
                        : // ? "text-cyan-300 "
                        character.state == "wrong"
                        ? "text-glacier-error underline decoration-solid decoration-glacier-error"
                        : "text-glacier-untyped"
                    } 
                    ${character.hidden ? "hidden" : null}
                  `}
          >
            {character.letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Typingdiv;
