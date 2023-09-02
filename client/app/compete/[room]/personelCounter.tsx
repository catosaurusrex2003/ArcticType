import { requestState, testState } from "@/store/competeGeneralStore";
import React, { useEffect, useRef, useState } from "react";

type props = {
  // setRequestState:(newState:requestState)=>void;
  // setTestState:(newState:testState)=>void;
  onFinish: () => void;
  perSecond: () => void;
  timeMax: number;
  // reRenderProp:any;
};

function PersonelCounter({ onFinish, perSecond, timeMax }: props) {
  const intervalId = useRef<NodeJS.Timer | undefined>();
  const timeOffset = timeMax;

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
  // console.log(reRenderProp)

  const startTimer = (e: any) => {
    // this function gets called every second
    // and update the state of the time.
    let { total, minutes, seconds } = getTimeRemaining(e);

    perSecond()

    if (total == 0) {
      onFinish()
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
    <div className="flex justify-center my-5">
      <span className="text-center w-full text-xl">{timer}</span>
    </div>
  );
}

export default PersonelCounter;
