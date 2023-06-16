"use client";
import { useGlobalContext } from "@/context/globalContext";
import React, { useEffect, useRef, useState } from "react";
import MyLineChart from "./LineChart";
import html2canvas from "html2canvas";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Page() {
  const { perSecondStatsArray, mode, timeOffset } = useGlobalContext();

  const router = useRouter();
  useEffect(() => {
    if (perSecondStatsArray.length == 0) router.push("/");
  }, []);

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
        const total =
          (each.wrong ? each.wrong : 0) + (each.correct ? each.correct : 0);
        var netWPM;
        var acc;
        var err;
        if (total != 0) {
          netWPM = (total / 5) * 60;
          if (netWPM) totalWpm += netWPM;
          acc = each.correct ? each.correct / total : 0;
        } else {
          acc = 0;
          err = 0;
          netWPM = 0;
        }
        console.log("accuracy: ",acc);
        totalAcc += acc;
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
      wpm: totalWpm / perSecondStatsArray.length,
      acc: totalAcc / perSecondStatsArray.length,
    }));
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center screenshotDiv"
      ref={screenShotRef}
    >
      <div className="flex flex-col md:flex-row  w-full md:w-3/5  justify-evenly ">
        {/* stats display */}
        <div className="flex flex-col text-white mb-4 items-center">
          <div className="text-center">
            <p className="  text-donkey-grape text-center text-2xl sm:text-3xl">
              wpm
            </p>
            {/* <p className="text-yellow-400 text-4xl sm:text-7xl">{Math.round(stats.wpm)}</p> */}
            <p className="text-cyan-400 text-center font-bold text-4xl sm:text-6xl">
              {Math.round(stats.wpm)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-donkey-grape text-center text-2xl sm:text-3xl">
              acc
            </p>
            <p className="text-cyan-400 text-center font-bold text-4xl sm:text-6xl">
              {Math.round(stats.acc * 100)}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-donkey-grape text-center text-lg">test type</p>
            <p className="text-cyan-400 text-center font-medium text-xl sm:text-2xl">
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
      </div>
      {/* utils display */}
      <div className="flex justify-evenly w-full md:w-3/5 ">
        <Image
          className="opacity-70 hover:opacity-100"
          src="play.svg"
          height="40"
          width="40"
          alt=""
          onClick={() => router.push("/")}
        />
        <Image
          className="opacity-70 hover:opacity-100"
          src="cycle.svg"
          height="40"
          width="40"
          alt=""
          onClick={() => router.push("/")}
        />
        <Image
          className="opacity-70 hover:opacity-100"
          src="screenshot.svg"
          height="40"
          width="40"
          alt=""
        />
      </div>
    </div>
  );
}

export default Page;
