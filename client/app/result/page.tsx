"use client";
import { useGlobalContext } from "@/context/globalContext";
import React, { useEffect, useRef, useState } from "react";
import MyLineChart from "./LineChart";
import html2canvas from "html2canvas";

function Page() {
  const { perSecondStatsArray, mode, timeOffset } = useGlobalContext();

  const screenShotRef = useRef<null | HTMLDivElement>(null);

  const [stats, setStats] = useState<{ wpm: number; acc: number }>({
    wpm: 0,
    acc: 0,
  });

  const [finalData, setFinalData] = useState<any>();

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
      console.log(screenshotDataURL);
    });
    if (screenshotDataURL) {
      const link = document.createElement("a");
      link.href = screenshotDataURL;
      link.download = "file";
      link.click();
    }
  };

  useEffect(() => {
    var totalWpm: number = 0;
    var totalAcc: number = 0;
    setFinalData(() => {
      return perSecondStatsArray.map((each, index) => {
        const total = each.wrong + each.correct;
        const netWPM = (total / 5) * 60;
        const acc = each.correct / total;
        if (netWPM) totalWpm += netWPM;
        if (acc) totalAcc += acc;
        return {
          time: index,
          Accuraccy: acc,
          Error: each.wrong / total,
          Net: netWPM,
        };
      });
    });
    setStats((prev) => ({
      ...prev,
      wpm: totalWpm / perSecondStatsArray.length,
      acc: totalAcc / perSecondStatsArray.length,
    }));
    console.log("this component rendered");
  }, []);

  return (
    <div className="flex justify-center screenshotDiv" ref={screenShotRef}>
      <div className="flex flex-col md:flex-row w-full md:w-3/5  justify-evenly ">
        {/* stats display */}
        <div className="flex flex-col text-white mb-4 items-center">
          <div className="text-center">
            <p className="text-text-color text-center text-2xl sm:text-3xl">
              wpm
            </p>
            {/* <p className="text-yellow-400 text-4xl sm:text-7xl">{Math.round(stats.wpm)}</p> */}
            <p className="text-yellow-400 text-center font-bold text-4xl sm:text-6xl">
              {Math.round(stats.wpm)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-text-color text-center text-2xl sm:text-3xl">
              acc
            </p>
            <p className="text-yellow-400 text-center font-bold text-4xl sm:text-6xl">
              {Math.round(stats.acc * 100)}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-text-color text-center text-lg">test type</p>
            <p className="text-yellow-400 text-center font-medium text-xl sm:text-2xl">
              {mode == "zen" ? "zen" : `time ${timeOffset}`}
            </p>
          </div>
        </div>
        {/* chart display */}
        {perSecondStatsArray && (
          <div className="flex flex-col w-full ">
            <MyLineChart finalData={finalData} />
          </div>
        )}
        {/* utils display */}
        <div className="flex ">
          {/* <Image  /> */}
        </div>
      </div>
    </div>
  );
}

export default Page;
