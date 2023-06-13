"use client";
import { useGlobalContext } from "@/context/globalContext";
import React, { useEffect, useRef } from "react";

import MyLineChart from "./LineChart";

function Page() {
  const { perSecondStatsArray } = useGlobalContext();

  //   if (chartRef.current) {
  //     //@ts-ignore
  //     const ctx = chartRef.current.getContext("2d");
  //     new Chart(ctx, {
  //       type: "line",
  //       data: {
  //         labels: ["January", "February", "March", "April", "May", "June"],
  //         datasets: [
  //           {
  //             label: "Line 1",
  //             data: [10, 20, 30, 25, 15, 35],
  //             borderColor: "blue",
  //             fill: false,
  //           },
  //           {
  //             label: "Line 2",
  //             data: [20, 15, 25, 30, 10, 40],
  //             borderColor: "red",
  //             fill: false,
  //           },
  //         ],
  //       },
  //       options: {
  //         responsive: true,
  //         scales: {
  //           x: {
  //             display: true,
  //             title: {
  //               display: true,
  //               text: "Month",
  //             },
  //           },
  //           y: {
  //             display: true,
  //             title: {
  //               display: true,
  //               text: "Value",
  //             },
  //           },
  //         },
  //       },
  //     });
  //   }
  // }, []);

  console.log(perSecondStatsArray);

  return (
    <div className="flex flex-col">
      {perSecondStatsArray && (
        <div className="flex flex-col">
          <MyLineChart data={perSecondStatsArray} />
        </div>
      )}
    </div>
  );
}

export default Page;
