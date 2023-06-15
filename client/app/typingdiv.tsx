"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { letterType } from "../types/textArray";
// import { useTimer } from "react-timer-hook";
import MyTimer from "./timer";
import { scoreType } from "@/types/score";
import { useGlobalContext } from "@/context/globalContext";

type TypingdivProps = {
  textArray: letterType[];
  setTextArray: Dispatch<SetStateAction<letterType[]>>;
  charIdArr: string[];
};

const Typingdiv = ({ textArray, setTextArray, charIdArr }: TypingdivProps) => {
  const {
    perSecondState,
    setPerSecondState,
    perSecondStatsArray,
    setPerSecondStatsArray,
    currentIndex,
    setCurrentIndex,
    timeOffset,
  } = useGlobalContext();

  // doesnt need to be global
  const [started, setStarted] = useState(false);


  const handlePerSecondStats = (params: 1 | 0) => {
    if (params) {
      setPerSecondState((prev) => ({
        ...prev,
        correct: (prev.correct += 1),
      }));
    } else {
      setPerSecondState((prev) => ({
        ...prev,
        wrong: (prev.wrong += 1),
      }));
    }
  };

  const handleKeyboardEvent = (event: any) => {
    event.preventDefault();
    const key = event.key;
    const alphanumericRegex = /^[a-zA-Z0-9.,'"]$/;
    // check regex
    if (key.match(alphanumericRegex) || key === " " || key === "Backspace") {
      console.log(key)
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
          setCurrentIndex((prev) => (prev -= 1));
        }
      } else {
        setTextArray((prev) => {
          // find the object of the letter
          const obj = prev.find((each) => each.id === charIdArr[currentIndex]);
          console.log(charIdArr[currentIndex])
          console.log(prev)
          console.log("here")
          if (obj) {
            // if correct change state
            if (obj.letter == key) {
              console.log("correct");
              obj.state = "correct";
              prev[currentIndex] = obj;
              handlePerSecondStats(1);
            } else {
              console.log("wrong");
              obj.state = "wrong";
              prev[currentIndex] = obj;
              handlePerSecondStats(0);
            }
          }
          return prev;
        });
        setCurrentIndex((prev) => (prev += 1));
      }
    }
    // write her logic to detect a full stop and hide the
    //
    //
    //
    // text before the fullstop in the array
  };

  return (
    <div className="flex flex-col mt-14 md:h-64 justify-center items-center">
      {started && (
        <div className="flex w-4/5 sm:w-3/4">
          <div className="mr-auto">
            <MyTimer />
          </div>
        </div>
      )}
      <div
        className="w-4/5 sm:w-3/4  text-justify select-none border-none"
        tabIndex={0}
        onKeyDown={handleKeyboardEvent}
      >
        {textArray.map((character) => (
          <span
            id={character.id}
            key={character.id}
            className={` text-lg sm:text-2xl select-none border-none
                    ${
                      charIdArr[currentIndex] == character.id
                        ? "blinking-cursor"
                        : null
                    }
                    ${
                      character.state == "correct"
                        ? "text-donkey-veronica "
                        // ? "text-cyan-300 "
                        : character.state == "wrong"
                        ? "text-red-600 underline decoration-solid decoration-donkey-rose"
                        : "text-donkey-tropicalIndigo"
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
