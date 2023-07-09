"use client";
import { useModeStore } from "@/store/modeStore";
import { usePerSecondStore } from "@/store/perSecondStore";
import { scoreType } from "@/types/score";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { shallow } from "zustand/shallow";

type propsType = {};

function MyTimer({}: propsType) {
  const router = useRouter();

  const [overwritePerSecondState, appendPerSecondStatsArray] =
    usePerSecondStore(
      (store) => [
        store.overwritePerSecondState,
        store.appendPerSecondStatsArray,
      ],
      shallow
    );

  const timeOffset = useModeStore((store) => store.timeOffset);

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
    appendPerSecondStatsArray();
    overwritePerSecondState({
      correct: 0,
      wrong: 0,
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
    <div className=" text-cyan-400 flex flex-col items-center text-2xl font-semibold  ">
      <span>{timer}</span>
    </div>
  );
}

export default MyTimer;
