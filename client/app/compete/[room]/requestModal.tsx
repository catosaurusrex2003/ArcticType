"use client";
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { motion, AnimatePresence } from "framer-motion";
import { requestState } from "@/store/competeGeneralStore";

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

type props = {
  username: string | null;
  isOpen: boolean;
  closeModal: (state: requestState) => void;
  requestValidity: number;
};

function RequestModal({
  username,
  isOpen,
  closeModal,
  requestValidity,
}: props) {
  const choice = useRef<requestState | null>();
  const intervalId = useRef<NodeJS.Timer | undefined>();
  const timeOffset = requestValidity;

  const [timer, setTimer] = useState(() => {
    const minutesString = String(Math.floor(timeOffset / 60)).padStart(2, "0");
    const secondsString = String(timeOffset % 60).padStart(2, "0");
    return `${minutesString}:${secondsString}`;
  });

  const getTimeRemaining = (e: any) => {
    // get the remaining time till the deadline
    // @ts-ignore
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      minutes,
      seconds,
    };
  };

  const startTimer = (e: any) => {
    // this function gets called every second
    // and update the state of the time.
    let { total, minutes, seconds } = getTimeRemaining(e);

    if (total == 0) {
      if (choice.current) {
        closeModal(choice.current);
      } else {
        closeModal("REJECTED");
      }
    }

    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const getDeadTime = () => {
    // get the time of the deadline startiong from now. which is timeoffsets seconds away from now.
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + timeOffset);
    return deadline;
  };

  useEffect(() => {
    const cache3 = getDeadTime();
    const Id: NodeJS.Timer = setInterval(() => {
      startTimer(cache3);
    }, 1000);
    intervalId.current = Id;
    return () => {
      clearInterval(intervalId.current);
    };
  }, []);

  const handleChoiceClick = (bool:boolean) =>  {
    if(bool){
      choice.current = "ACCEPTED"
    }
    else{
      choice.current = "REJECTED"
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        // closeModal("REJECTED");

      }}
      style={customStyles}
    >
      <AnimatePresence>
        <motion.div
          className="bg-glacier-subprimary text-white border-2 border-white px-10 w-60 sm:w-80  py-2 rounded-lg flex flex-col items-start justify-evenly text-sm font-semibold"
          initial={{ opacity: 0.6, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.6, scale: 0.99 }}
        >
          <span className="text-center mx-auto">
            {username} invites you to join a match
          </span>
          <span className="text-center w-full text-xl">{timer}</span>
          {!choice.current && (
            <div className="flex justify-between w-full">
              <button
                onClick={() => handleChoiceClick(true)}
                className="px-3 py-1 rounded-sm bg-glacier-button-green hover:bg-glacier-button-green-hover  active:bg-glacier-button-green"
              >
                Yes
              </button>
              <button
                onClick={() => handleChoiceClick(false)}
                className="px-3 py-1 rounded-sm bg-red-500 hover:bg-red-600  active:bg-red-500"
              >
                No
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </Modal>
  );
}

export default RequestModal;
