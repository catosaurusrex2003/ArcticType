"use client";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
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

  const [focusStatus, setFocusState] = useState<Boolean>();

  const focusRef = useRef<HTMLDivElement>(null!);

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

  const handleFocus = (param: 0 | 1) => {
    var Id;
    if (param) {
      clearTimeout(Id);
      setFocusState(true);
    } else {
      Id = setTimeout(() => {
        setFocusState(false);
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col mt-14 md:h-64 justify-center items-center relative">
      {started && (
        <div className="flex w-4/5 sm:w-3/4">
          <div className="mr-auto">
            <MyTimer />
          </div>
        </div>
      )}
      <div
        className={`w-4/5 sm:w-3/4  text-justify select-none border-none focus:outline-none ${
          focusStatus ? null : "blur-div"
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
            className={` text-lg sm:text-2xl select-none border-none
                    ${
                      charIdArr[currentIndex] == character.id
                        ? "blinking-cursor"
                        : null
                    }
                    ${
                      character.state == "correct"
                        ? "text-donkey-veronica "
                        : // ? "text-cyan-300 "
                        character.state == "wrong"
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
      <span
        className={` ${
          focusStatus ? "hidden" : " block"
        } overlay-text text-donkey-rose text-xl text-center font-semibold`}
        onClick={() => {
          if(focusRef.current) focusRef.current.focus();
        }}
      >
        👆🏻 click to start typing
      </span>
    </div>
  );
};

export default Typingdiv;
