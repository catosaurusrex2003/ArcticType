"use client";
import { useGlobalContext } from "@/context/globalContext";
import { scoreType } from "@/types/score";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

type propsType = {};

function MyTimer({}: propsType) {
  const router = useRouter();

  const { timeOffset, setPerSecondState, setPerSecondStatsArray } =
    useGlobalContext();

  const [timer, setTimer] = useState(() => {
    const minutesString = String(Math.floor(timeOffset / 60)).padStart(2, "0");
    const secondsString = String(timeOffset % 60).padStart(2, "0");
    return `${minutesString}:${secondsString}`;
  });

  const getTimeRemaining = (e: any) => {
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
    let { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + timeOffset);
    return deadline;
  };

  useEffect(() => {
    const cache3 = getDeadTime();
    setInterval(() => {
      startTimer(cache3);
    }, 1000);
  }, []);

  const emitPerSecondStats = () => {
    setPerSecondState((prev) => {
      setPerSecondStatsArray((prev1) => [...prev1, prev]);
      return {
        correct: 0,
        wrong: 0,
      };
    });
  };

  useEffect(() => {
    emitPerSecondStats();
    if (timer == "00:00") {
      router.push("/result");
    }
    return () => {};
  }, [timer]);

  return (
    <div className=" text-yellow-300 flex flex-col items-center text-2xl font-semibold  ">
      <span>{timer}</span>
    </div>
  );
}

export default MyTimer;
