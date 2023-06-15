import { useGlobalContext } from "@/context/globalContext";
import Image from "next/image";
import React from "react";

function SelectionModal() {
  const { timeOffset, setTimeOffset, mode, setMode , timeMode , setTimeMode } = useGlobalContext();

  return (
    <div className="flex justify-center text-text-color-imp">
      <div className="bg-background-dark-gray px-7 py-1  w-3/5 sm:w-4/5 max-w-2xl rounded-lg flex flex-col md:flex-row items-center justify-evenly">
        <div className="w-full sm:w-1/3 flex justify-evenly ">
          <div
            className={` ${
              timeMode?.punctuation ? null : "each-selection-item"
            } flex items-center text-slate-300`}
            onClick={() => setTimeMode((prev)=>({...prev,punctuation:!prev.punctuation}))}
          >
            <span
              className={`${timeMode?.punctuation ? "text-yellow-400" : null} ms-1`}
            >
              punctuation
            </span>
          </div>
          <div
            className={`${
              timeMode?.numbers ? null : "each-selection-item"
            } flex items-center text-slate-300`}
            onClick={() => setTimeMode((prev)=>({...prev,numbers:!prev.numbers}))}
          >
            <span
              className={`${timeMode?.numbers ? "text-yellow-400" : null} ms-2`}
            >
              numbers
            </span>
          </div>
        </div>
        <div className="w-full sm:w-1/3 flex justify-evenly ">
          <div
            className={`${
              mode === "time" ? null : "each-selection-item"
            } flex items-center text-slate-300`}
            onClick={() => setMode("time")}
          >
            <Image
              src={`${mode === "zen" ? "/clock.svg" : "/clock-yellow.svg"}`}
              className={``}
              height={15}
              width={15}
              alt="time challenge"
            />
            <span
              className={`${mode == "time" ? "text-yellow-400" : null} ms-1`}
            >
              time
            </span>
          </div>
          <div
            className={`${
              mode === "zen" ? null : "each-selection-item"
            } flex items-center  text-slate-300`}
            onClick={() => setMode("zen")}
          >
            <Image
              src={`${mode === "zen" ? "/triangle-2.svg" : "/triangle.svg"}`}
              className={``}
              height={15}
              width={15}
              alt="zen challenge"
            />
            <span
              className={` ${mode == "zen" ? "text-yellow-400" : null} ms-1 `}
            >
              zen
            </span>
          </div>
        </div>
        <div className="w-full sm:w-1/3 flex justify-evenly">
          <span
            className={`${
              timeOffset == 15 ? "text-yellow-400" : null
            } hover:text-slate-300`}
            onClick={() => {
              setTimeOffset(15);
            }}
          >
            15
          </span>
          <span
            className={`${
              timeOffset == 30 ? "text-yellow-400" : null
            } hover:text-slate-300`}
            onClick={() => {
              setTimeOffset(30);
            }}
          >
            30
          </span>
          <span
            className={`${
              timeOffset == 60 ? "text-yellow-400" : null
            } hover:text-slate-300`}
            onClick={() => {
              setTimeOffset(60);
            }}
          >
            60
          </span>
          <span
            className={`${
              timeOffset == 120 ? "text-yellow-400" : null
            } hover:text-slate-300`}
            onClick={() => {
              setTimeOffset(120);
            }}
          >
            120
          </span>
        </div>
      </div>
    </div>
  );
}

export default SelectionModal;
