"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { shallow } from "zustand/shallow";
import { useModeStore } from "@/store/modeStore.tsx";
import Modal from "react-modal";
import { motion, AnimatePresence } from "framer-motion";

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

  

  const closeModal = () => {
    setIsOpen(false);
  };

  const animationVariants = {};

  return (
    <div className="flex flex-col items-center justify-center text-slate-600">
      <div className="bg-glacier-subprimary px-4 py-3 w-3/5 md:w-4/5 max-w-3xl rounded-md flex flex-col md:flex-row items-center justify-evenly  font-semibold">
        <div className="w-full sm:w-1/3 flex justify-evenly ">
          <div
            className={`cursor-pointer ${
              timeMode?.punctuation ? null : "each-selection-item"
            } flex items-center text-slate-300  hover:text-white `}
            onClick={() => setTimeMode("punctuation")}
          >
            <span
              className={`${
                timeMode?.punctuation ? "text-glacier-accent" : null
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
                timeMode?.number ? "text-glacier-accent" : null
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
              className={` ${mode == "time" ? "text-glacier-accent" : null} ms-1 `}
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
              className={` ${mode == "zen" ? "text-glacier-accent" : null} ms-1 `}
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
                  ? "text-glacier-accent"
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
                  ? "text-glacier-accent"
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
                  ? "text-glacier-accent"
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
                  ? "text-glacier-accent"
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
      <div className="bg-glacier-subprimary px-6 py-3 mt-5 rounded-lg flex flex-row items-center justify-evenly font-bold">
        <div
          className={`cursor-pointer flex items-center `}
          onClick={() => setIsOpen(true)}
        >
          <span className={`text-slate-300 hover:text-slate-100`}>
            {textCategory == "english" ? "English" : null}
            {textCategory == "webdev" ? "Web Dev" : null}
          </span>
        </div>
        <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
          <AnimatePresence>
            <motion.div
              className="bg-glacier-subprimary text-white px-10 w-60 sm:w-80  py-2 rounded-lg flex flex-col items-start justify-evenly"
              initial={{ opacity: 0.6, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0.6, scale: 0.99 }}
            >
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
            </motion.div>
          </AnimatePresence>
        </Modal>
      </div>
    </div>
  );
}

export default SelectionModal;
