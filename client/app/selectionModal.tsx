"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { shallow } from "zustand/shallow";
import { useModeStore } from "@/store/modeStore.tsx";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    border: "none",
    backgroundColor: "rgba(0, 0, 0, 0)",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};

function SelectionModal() {
  const [
    mode,
    setMode,
    timeMode,
    setTimeMode,
    textCategory,
    setTextCategory,
    timeOffset,
    setTimeOffset,
  ] = useModeStore(
    (store) => [
      store.mode,
      store.setMode,
      store.timeMode,
      store.setTimeMode,
      store.textCategory,
      store.setTextCategory,
      store.timeOffset,
      store.setTimeOffset,
    ],
    shallow
  );

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center text-slate-600">
      <div className="bg-donkey-dark-purple px-7 py-1  w-3/5 sm:w-4/5 max-w-2xl rounded-lg flex flex-col md:flex-row items-center justify-evenly">
        <div className="w-full sm:w-1/3 flex justify-evenly ">
          <div
            className={`cursor-pointer ${
              timeMode?.punctuation ? null : "each-selection-item"
            } flex items-center text-slate-300  hover:text-white `}
            onClick={() => setTimeMode("punctuation")}
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
              timeMode?.number ? null : "each-selection-item"
            } flex items-center text-slate-300  hover:text-white `}
            onClick={() => setTimeMode("number")}
          >
            <span
              className={`${
                timeMode?.number ? "text-donkey-magenta" : null
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
      <div className="bg-donkey-dark-purple px-5 py-1 mt-5 rounded-lg flex flex-row items-center justify-evenly">
        <div
          className={`cursor-pointer flex items-center `}
          onClick={() => setIsOpen(true)}
        >
          <span className={`text-slate-300 hover:text-slate-100`}>
            {textCategory == "english"?"English":null}
            {textCategory == "webdev"?"Web Dev":null}
          </span>
        </div>
        {/* @ts-ignore */}
        <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
          <div className="bg-donkey-dark-purple text-white px-10 w-60 sm:w-80  py-2 rounded-lg flex flex-col items-start justify-evenly">
            <span className={`font-semibold text-lg   my-1`}>Languages</span>
            <hr className=" border-white border-t-1 w-full" />
            <span
              className={` hover:text-slate-300 my-1 cursor-pointer`}
              onClick={() => {
                setTextCategory("english");
                closeModal();
              }}
            >
              English 1K
            </span>
            <span
              className={` hover:text-slate-300 my-1 cursor-pointer`}
              onClick={() => {
                setTextCategory("english");
                closeModal();
              }}
            >
              English 2K
            </span>
            <span
              className={` hover:text-slate-300 my-1 cursor-pointer`}
              onClick={() => {
                setTextCategory("webdev");
                closeModal();
              }}
            >
              Web Dev
            </span>
            <span
              className={` hover:text-slate-300 my-1 cursor-pointer`}
              onClick={() => {
                setTextCategory("english");
                closeModal();
              }}
            >
              Python
            </span>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default SelectionModal;
