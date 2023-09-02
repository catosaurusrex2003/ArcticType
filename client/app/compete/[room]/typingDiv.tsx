"use client";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { shallow } from "zustand/shallow";
import { letterType } from "@/types/textArray";
import { useCompeteGeneralStore } from "@/store/competeGeneralStore";
import { RealtimeChannel } from "@supabase/supabase-js";
import PersonelCounter from "./personelCounter";
import TypingDivTimer from "./typingDivTimer";
import { motion } from "framer-motion";

type TypingdivProps = {
  roomChannelState: RealtimeChannel | null | undefined;
  textArray: letterType[];
  setTextArray: (
    ValueOrUpdater:
      | letterType[]
      | ((currentState: letterType[]) => letterType[])
  ) => void;
};

const Typingdiv = ({
  roomChannelState,
  textArray,
  setTextArray,
}: TypingdivProps) => {
  const [
    username,
    currentIndex,
    incrementCurrentIndex,
    decrementCurrentIndex,
    testDuration,
  ] = useCompeteGeneralStore(
    (store: any) => [
      store.username,
      store.currentIndex,
      store.incrementCurrentIndex,
      store.decrementCurrentIndex,
      store.testDuration,
    ],
    shallow
  );

  // the state wether to focus or not
  const [focusStatus, setFocusStatus] = useState<{
    state: boolean;
    mounted: boolean;
  }>({ state: true, mounted: false });
  // ids of the spans which wrap in the div
  const [wrapSpanIds, setWrapSpanIds] = useState<string[]>();
  // example 28px
  const [currentLineHeight, setCurrenLineHeight] = useState<number>(32);
  // doesnt need to be global. depicts if the test is started or not
  // will put this one layer up
  const [started, setStarted] = useState(false);
  // numbers of lines-height distance scrolled. used in divRef.current.scrollTop]
  const lineScrolled = useRef<number>(1);
  // the container div of all the spans
  const focusRef = useRef<HTMLDivElement>(null!);

  const scrollOneLine = () => {
    console.log("one line scrolled");
    focusRef.current.scrollTop = currentLineHeight * lineScrolled.current;
    lineScrolled.current += 1;
  };

  useEffect(() => {
    setStarted(false);
  }, []);

  const handleKeyboardEvent = (event: any) => {
    event.preventDefault();
    const key = event.key;
    const alphanumericRegex = /^[a-zA-Z0-9.,'";:?)(*&%$#@!|/^]$/;
    // check regex and overflow
    if (
      (key.match(alphanumericRegex) || key === " " || key === "Backspace") &&
      currentIndex < textArray.length - 1
    ) {
      setStarted(true);
      if (key === "Backspace") {
        if (currentIndex !== 0) {
          setTextArray((prev) => {
            const tempState = [...prev];
            // find the object of the letter
            const obj = tempState.find(
              (each) => each.id == tempState[currentIndex - 1].id
            );
            // change the state of letter to pending in the array
            if (obj) {
              const tempObj = { ...obj };
              tempObj.state = "pending";
              tempState[currentIndex - 1] = tempObj;
            }
            return [...tempState];
          });
          decrementCurrentIndex();
        }
      } else {
        // variable to check if it needs to be incremented or not
        var increment:boolean = true
        setTextArray((prev) => {
          // find the object of the letter
          const tempState = [...prev];
          if (
            currentIndex >= 1 &&
            tempState[currentIndex - 1].state == "wrong"
          ) {
            increment = false;
            return prev;
          }
          const obj = tempState.find(
            (each) => each.id === tempState[currentIndex].id
          );
          if (obj) {
            const tempObj = { ...obj };
            // if correct change state
            if (tempObj.letter == key) {
              tempObj.state = "correct";
              tempState[currentIndex] = tempObj;
            } else {
              tempObj.state = "wrong";
              tempState[currentIndex] = tempObj;
            }
            if (wrapSpanIds) {
              // linescrolled.current starts from 1. i have purposely not put linescrolled.current-1 below.
              // so that it starts scrolling from the second line
              if (tempObj.id == wrapSpanIds[lineScrolled.current]) {
                scrollOneLine();
              }
            }
          }
          return tempState;
        });
        increment && incrementCurrentIndex();
      }
    }
  };

  const handleFocus = (focusState: 0 | 1) => {
    if (focusState) {
      setFocusStatus((prev) => ({ ...prev, state: true }));
    } else {
      setFocusStatus((prev) => ({ ...prev, state: false }));
    }
  };

  useEffect(() => {
    if (focusStatus.mounted) {
      // alreadymounted
      handleFocus(0);
    } else {
      // first time mounting
      setFocusStatus((prev) => ({ ...prev, mounted: true }));
      const focusDiv = document.getElementById("typing-div-focus");
      if (focusDiv) {
        console.log("focussing");
        focusDiv.focus();
      }
    }
  }, []);

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
    <div className="flex flex-col  items-center relative mt-20">
      {/* {started && ( */}
      <div className="flex w-4/5 sm:w-3/4">
        <div className="mr-auto">
          <TypingDivTimer
            timeMax={testDuration}
            roomChannelState={roomChannelState}
          />
        </div>
      </div>
      {/* )} */}
      <div className="relative flex flex-col items-center w-full">
        <div
          className={`typing-div-focus w-4/5 sm:w-3/4 h-20 sm:h-32 overflow-hidden text-justify select-none border-none focus:outline-none ${
            focusStatus.state ? null : "blur-div cursor-pointer"
          }
        font-semibold leading-6
        `}
          ref={focusRef}
          id="typing-div-focus"
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
                      textArray[currentIndex].id == character.id
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
        {!focusStatus.state && (
          <motion.div
            className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white pointer-events-none"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Click to Start typing
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Typingdiv;
