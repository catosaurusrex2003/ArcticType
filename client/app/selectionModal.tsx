import { useGlobalContext } from "@/context/globalContext";
import Image from "next/image";
import React from "react";

function SelectionModal() {
  const { timeOffset, setTimeOffset, mode, setMode, timeMode, setTimeMode } =
    useGlobalContext();

  return (
    <div className="flex justify-center text-slate-600">
      <div className="bg-donkey-dark-purple px-7 py-1  w-3/5 sm:w-4/5 max-w-2xl rounded-lg flex flex-col md:flex-row items-center justify-evenly">
        <div className="w-full sm:w-1/3 flex justify-evenly ">
          <div
            className={`cursor-pointer ${
              timeMode?.punctuation ? null : "each-selection-item"
            } flex items-center text-slate-300  hover:text-white `}
            onClick={() =>
              setTimeMode((prev) => ({
                ...prev,
                punctuation: !prev.punctuation,
              }))
            }
          >
            <span
              className={`${
                timeMode?.punctuation ? "text-donkey-magenta" : null
              } ms-1`}
            >
              punctuation
            </span>
          </div>
          <div
            className={`cursor-pointer ${
              timeMode?.numbers ? null : "each-selection-item"
            } flex items-center text-slate-300  hover:text-white `}
            onClick={() =>
              setTimeMode((prev) => ({ ...prev, numbers: !prev.numbers }))
            }
          >
            <span
              className={`${
                timeMode?.numbers ? "text-donkey-magenta" : null
              } ms-2`}
            >
              numbers
            </span>
          </div>
        </div>
        <div className="w-full sm:w-1/3 flex justify-evenly ">
          <div
            className={`cursor-pointer ${
              mode === "time" ? null : "each-selection-item"
            } flex items-center  text-slate-300`}
            onClick={() => setMode("time")}
          >
            <Image
              src={`${mode == "time" ? "clock-cyan.svg" : "clock.svg"}`}
              className={`opacity-100`}
              height={13}
              width={13}
              alt="time challenge"
            />
            <span
              className={` ${mode == "time" ? "text-cyan-400" : null} ms-1 `}
            >
              time
            </span>
          </div>
          <div
            className={`cursor-pointer ${
              mode === "zen" ? null : "each-selection-item"
            } flex items-center  text-slate-300`}
            onClick={() => setMode("zen")}
          >
            <Image
              src={`${mode == "zen" ? "triangle-cyan.svg" : "triangle.svg"}`}
              className={``}
              height={15}
              width={15}
              alt="zen challenge"
            />
            <span
              className={` ${mode == "zen" ? "text-cyan-400" : null} ms-1 `}
            >
              zen
            </span>
          </div>
        </div>
        {mode == "zen" ? null : (
          <div className="w-full sm:w-1/3 flex justify-evenly">
            <span
              className={`cursor-pointer  ${
                timeOffset == 15
                  ? "text-cyan-400"
                  : "each-selection-item text-slate-300"
              } flex items-center   hover:text-white `}
              onClick={() => {
                setTimeOffset(15);
              }}
            >
              15
            </span>
            <span
              className={`cursor-pointer  ${
                timeOffset == 30
                  ? "text-cyan-400"
                  : "each-selection-item text-slate-300"
              } flex items-center   hover:text-white `}
              onClick={() => {
                setTimeOffset(30);
              }}
            >
              30
            </span>
            <span
              className={`cursor-pointer  ${
                timeOffset == 60
                  ? "text-cyan-400"
                  : "each-selection-item text-slate-300"
              } flex items-center   hover:text-white `}
              onClick={() => {
                setTimeOffset(60);
              }}
            >
              60
            </span>
            <span
              className={`cursor-pointer  ${
                timeOffset == 120
                  ? "text-cyan-400"
                  : "each-selection-item text-slate-300"
              } flex items-center   hover:text-white `}
              onClick={() => {
                setTimeOffset(120);
              }}
            >
              120
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectionModal;
