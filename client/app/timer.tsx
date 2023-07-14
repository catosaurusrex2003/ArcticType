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

  const intervalId = useRef<NodeJS.Timer | undefined>();

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

  const emitPerSecondStats = () => {
    appendPerSecondStatsArray();
    overwritePerSecondState({
      correct: 0,
      wrong: 0,
    });
  };

  const startTimer = (e: any) => {
    // this function gets called every second
    // and update the state of the time.
    let { total, minutes, seconds } = getTimeRemaining(e);

    emitPerSecondStats();

    if (total == 0) {
      clearInterval(intervalId.current);
      router.push("/result");
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

  return (
    <div className=" text-cyan-400 flex flex-col items-center text-2xl font-semibold  ">
      <span>{timer}</span>
    </div>
  );
}

export default MyTimer;
