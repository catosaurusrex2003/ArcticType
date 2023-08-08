"use client";
import React, { useEffect, useRef, useState } from "react";
import MyLineChart from "./LineChart";
import html2canvas from "html2canvas";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useModeStore } from "@/store/modeStore.tsx";
import { usePerSecondStore } from "@/store/perSecondStore";
import "./styles.css";
import { shallow } from "zustand/shallow";
import { useGeneralStore } from "@/store/generalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosBasicInstance from "@/config/axiosConfig";
import { whatMode } from "@/utils/what";
import Confetti from "react-confetti";

type statsType = {
  wpm: number;
  acc: number;
  rawTotalCorrect: number;
  rawTotalIncorrect: number;
  totalRaw: number;
};

function Page() {
  const [mode, timeMode, textCategory, setRetest] = useModeStore(
    (store) => [
      store.mode,
      store.timeMode,
      store.textCategory,
      store.setRetest,
    ],
    shallow
  );

  const [auth, prevStats, setPrevStats] = useGeneralStore(
    (store) => [store.auth, store.prevStats, store.setPrevStats],
    shallow
  );

  const perSecondStatsArray = usePerSecondStore(
    (store) => store.perSecondStatsArray
  );

  const timeOffset = useModeStore((store) => store.timeOffset);

  const [stats, setStats] = useState<statsType>({
    wpm: 0,
    acc: 0,
    rawTotalCorrect: 0,
    rawTotalIncorrect: 0,
    totalRaw: 0,
  });

  const [finalData, setFinalData] = useState<any>();

  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  const [displayConfetti, setDisplayConfetti] = useState<boolean>(false);

  const router = useRouter();

  const queryClient = useQueryClient();

  const screenShotRef = useRef<null | HTMLDivElement>(null);
  const takeScreenShot = () => {
    // if (canvasRef.current) {
    //   const screenshotDataURL = canvasRef.current.toDataURL("image/png");
    //   console.log(screenshotDataURL);
    // }
    const doc = document.getElementsByClassName("screenshotDiv");
    var screenshotDataURL;
    // @ts-ignore
    html2canvas(screenShotRef.current).then((canvas) => {
      screenshotDataURL = canvas.toDataURL("image/jpeg");
    });
    if (screenshotDataURL) {
      const link = document.createElement("a");
      link.href = screenshotDataURL;
      link.download = "file";
      link.click();
    }
  };

  // write to database
  const recordNewTest = useMutation({
    mutationFn: () =>
      axiosBasicInstance.post("/newTest", {
        userEmail: auth?.email,
        userName:auth?.username,
        stats: {
          time: timeOffset,
          wpm: Math.round(stats.wpm),
          acc: Math.round(stats.acc * 100),
          type: whatMode(timeMode),
          retest: prevStats ? true : false,
        },
      }),
    onSuccess: (props) => {
      queryClient.invalidateQueries({
        queryKey:["userData","leaderboard"],
        refetchType:"all"
      });
      // console.log("props is ", props);
    },
  });

  // fake protected route
  // setRetest(false)
  // trigger confetti on new record
  useEffect(() => {
    if (perSecondStatsArray.length == 0) router.push("/");

    setRetest(false);

    if (stats.wpm && stats.acc && auth) {
      const previousWpmRecord = (
        auth.records as { [key: string]: { wpm: number; acc: number } }
      )[timeOffset]?.wpm;
      if (stats.wpm > previousWpmRecord) {
        setDisplayConfetti(true);
      }
      console.log({
        time: timeOffset,
        wpm: Math.round(stats.wpm),
        acc: Math.round(stats.acc * 100),
        type: whatMode(timeMode),
        retest: prevStats ? true : false,
      })
      recordNewTest.mutate();
    }
  }, [stats.wpm, stats.acc]);

  // tha calculations  things
  useEffect(() => {
    var totalRaw: number = 0;
    var totalWpm: number = 0;
    var totalAcc: number = 0;
    var totalCorrectPM: number = 0;
    var rawTotalCorrect: number = 0;
    var rawTotalIncorrect: number = 0;
    setFinalData(() => {
      return perSecondStatsArray.map((each, index) => {
        const total =
          (each.wrong ? each.wrong : 0) + (each.correct ? each.correct : 0);
        totalRaw += total;
        var netWPM;
        var acc;
        var err;
        totalCorrectPM += ((each.correct ? each.correct : 0) / 5) * 60;
        rawTotalCorrect += each.correct;
        rawTotalIncorrect += each.wrong;
        if (total != 0) {
          netWPM = (total / 5) * 60;
          if (netWPM) totalWpm += netWPM;
          err = each.wrong ? each.wrong / total : 0;
          acc = each.correct ? each.correct / total : 0;
          0;
          totalAcc += acc;
        } else {
          acc = 0;
          err = 0;
          netWPM = 0;
        }
        return {
          time: index,
          Accuraccy: acc,
          Error: err,
          Net: netWPM,
        };
      });
    });
    setStats((prev) => ({
      ...prev,
      wpm: totalCorrectPM / perSecondStatsArray.length,
      acc: totalAcc / perSecondStatsArray.length,
      rawTotalCorrect: rawTotalCorrect,
      rawTotalIncorrect: rawTotalIncorrect,
      totalRaw: totalRaw,
    }));
  }, []);

  // to get the screen sizes
  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center screenshotDiv"
      ref={screenShotRef}
    >
      {displayConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          tweenDuration={2000}
          recycle={false}
          numberOfPieces={300}
        />
      )}
      <div className="flex flex-col md:flex-row  w-full   md:w-3/5  justify-evenly md:items-start items-center ">
        {/* stats display */}
        <div className="flex flex-col text-white w-30 mb-4 items-start h-full">
          <div className="text-start">
            <p className="  text-donkey-grape  font-light text-lg">wpm</p>
            <div>
              {prevStats?.wpm && (
                <span className="text-cyan-700  font-medium text-sm me-2">
                  {Math.round(prevStats.wpm)}
                </span>
              )}
              <span className="text-cyan-400 font-medium text-3xl">
                {Math.round(stats.wpm)}
              </span>
            </div>
          </div>
          <div className="text-start">
            <p className="text-donkey-grape  font-light text-lg">acc</p>
            <div>
              {prevStats?.acc && (
                <span className="text-cyan-700  font-medium text-sm me-2">
                  {Math.round(prevStats.acc * 100)}%
                </span>
              )}
              <span className="text-cyan-400  font-medium text-3xl">
                {Math.round(stats.acc * 100)}%
              </span>
            </div>
          </div>
        </div>
        {/* chart display */}
        {perSecondStatsArray && (
          <div className="flex flex-col w-full ">
            <MyLineChart finalData={finalData} />
          </div>
        )}
      </div>
      {/* bottom stats */}
      <div className="flex justify-evenly w-full md:w-3/5 mb-5">
        <div className="text-center">
          <p className="text-donkey-grape  font-light">test type</p>
          <p className="text-cyan-400 font-medium text-lg">
            {mode == "zen" ? "zen" : `time ${timeOffset}`}
          </p>
          <p className="text-cyan-400 font-medium text-lg">
            {textCategory == "english" ? "English" : null}
            {textCategory == "webdev" ? "Web Dev" : null}
          </p>
        </div>
        <div className="text-center">
          <p className="text-donkey-grape  font-light">text type</p>
          <p
            className={`text-cyan-400 font-medium text-lg ${
              timeMode.punctuation ? "" : " line-through text-cyan-700"
            }`}
          >
            punctuations
          </p>
          <p
            className={`text-cyan-400 font-medium text-lg ${
              timeMode.number ? "" : " line-through text-cyan-700"
            }`}
          >
            numbers
          </p>
        </div>
        <div className="text-center">
          <p className="text-donkey-grape  font-light">raw</p>
          <p className={`text-cyan-400 font-medium text-3xl`}>
            {stats.totalRaw}
          </p>
        </div>
        <div className="text-center tooltip-container">
          <p className="text-donkey-grape  font-light">characters</p>
          <div className="tooltip-trigger">
            <span
              className={`text-cyan-400 font-medium text-3xl cursor-pointer`}
            >
              {stats.rawTotalCorrect}/
            </span>
            <span
              className={`text-cyan-400 font-medium text-3xl cursor-pointer`}
            >
              {stats.rawTotalIncorrect}
            </span>
          </div>
          <div className="tooltip-content">correct/wrong</div>
        </div>
      </div>
      {/* utils display */}
      <div className="flex justify-evenly w-full md:w-3/5 border-t-2  border-white py-5 ">
        <div className="tooltip-container">
          <Image
            className="opacity-70 hover:opacity-100 cursor-pointer tooltip-trigger"
            src="play.svg"
            height="40"
            width="40"
            alt=""
            onClick={() => {
              setPrevStats(null);
              setRetest(false);
              router.push("/");
            }}
          />
          <div className="tooltip-content">next</div>
        </div>
        <div className="tooltip-container">
          <Image
            className="opacity-70 hover:opacity-100 cursor-pointer tooltip-trigger"
            src="cycle.svg"
            height="40"
            width="40"
            alt=""
            onClick={() => {
              setPrevStats({
                wpm: stats.wpm,
                acc: stats.acc,
              });
              // make retest true
              setRetest(true);
              router.push("/");
            }}
          />
          <div className="tooltip-content">restart</div>
        </div>
        <div className="tooltip-container">
          <Image
            className="opacity-70 hover:opacity-100 cursor-pointer tooltip-trigger"
            src="screenshot.svg"
            height="40"
            width="40"
            alt=""
          />
          <div className="tooltip-content">screenshot</div>
        </div>
      </div>
    </div>
  );
}

export default Page;
