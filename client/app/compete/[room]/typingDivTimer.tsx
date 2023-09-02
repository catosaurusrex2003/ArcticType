"use client";
import { useCompeteGeneralStore } from "@/store/competeGeneralStore";
import { testRunningDBUpdate } from "@/utils/supabaseDbMutation";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { shallow } from "zustand/shallow";

type props = {
  timeMax: number;
  roomChannelState: RealtimeChannel | null | undefined;
};

function TypingDivTimer({ timeMax, roomChannelState }: props) {
  const roomId = useParams().room;
  let [
    username,
    setIStartedTest,
    getCurrentIndex,
    incrementTestDurationCompleted,
    setTestState,
    setRequestState,
    resetCurrentIndex,
    resetTestDurationCompleted
  ] = useCompeteGeneralStore(
    (store: any) => [
      store.username,
      store.setIStartedTest,
      store.getCurrentIndex,
      store.incrementTestDurationCompleted,
      store.setTestState,
      store.setRequestState,
      store.resetCurrentIndex,
      store.resetTestDurationCompleted
    ],
    shallow
  );

  const intervalId = useRef<NodeJS.Timer | undefined>();
  const timeOffset = timeMax;

  const [timer, setTimer] = useState(() => {
    const minutesString = String(Math.floor(timeOffset / 60)).padStart(2, "0");
    const secondsString = String(timeOffset % 60).padStart(2, "0");
    return `${minutesString}:${secondsString}`;
  });

  const getTimeRemaining = (e: any) => {
    // get the remaining time till the deadline
    const total = Date.parse(e) - Date.parse(new Date().toString());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      minutes,
      seconds,
    };
  };

  const emitPerSecondWPM = () => {
    if (roomChannelState) {
      roomChannelState.send({
        type: "broadcast",
        event: "speedUpdate",
        payload: {
          username: username,
          index: getCurrentIndex(),
        },
      });
    }
  };

  var startTimer = (e: any) => {
    // this function gets called every second
    // and update the state of the time.
    let { total, minutes, seconds } = getTimeRemaining(e);
    
    emitPerSecondWPM();
    incrementTestDurationCompleted();

    if (total == 0) {
      // onFinish();
      setTestState("IDLE");
      setIStartedTest(false)
      setRequestState("REJECTED")
      resetCurrentIndex()
      resetTestDurationCompleted()
      // set the testStarted to true in database. this doesnt need to be synchronouse
      testRunningDBUpdate({ testState: false, roomId: roomId });
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

export default TypingDivTimer;
