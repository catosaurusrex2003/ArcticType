"use client";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { scoreType } from "@/types/score";

type payloadType = {
  name: string;
  value: number;
  stroke: string;
};

type CustomToolTipProp = {
  active?: Boolean;
  payload?: payloadType[];
  label?: string;
};

// @ts-ignore
export const CustomTooltip = ({
  active,
  payload,
  label,
}: CustomToolTipProp) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip font-semibold  text-center px-3 py-1 rounded-xl"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      >
        <p className="label text-white">Time: {`${label}`}</p>
        {payload.map((data, index) => {
          return (
            <p key={index} style={{ color: data.stroke }}>
              {`${data.name}: ${data.value.toFixed(2)}`}
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

export type propsType = {
  finalData: {
    time: number;
    Accuraccy: number;
    Error: number;
    Net: number;
  }[];
};
function MyLineChart({ finalData }: propsType) {
  const [displayState, setDisplayState] = useState({
    net: true,
    accuracy: true,
    error: false,
  });
  console.log(finalData);

  // const finalfinalData = finalData.map((each, index) => {
  //   // https://www.speedtypingonline.com/typing-equations
  //   // const netWPM = (((each.correct+each.wrong)/5)  - each.wrong )  * 60
  //   const total = each.wrong + each.correct;
  //   const netWPM = (total / 5) * 60;
  //   console.log(each.correct / total);
  //   return {
  //     time: index,
  //     Accuraccy: each.correct / total,
  //     Error: each.wrong / total,
  //     Net: netWPM,
  //   };
  // });

  return (
    <div  className="flex justify-center">
      <div className="max-w-2xl flex flex-col w-full">
        <ResponsiveContainer width="100%" aspect={2.8} >
          <LineChart data={finalData}>
            <CartesianGrid strokeDasharray="10 0 0" stroke="#545557" />
            <XAxis
              dataKey="time"
              width={23}
              axisLine={false}
              tick={{ fontSize: 15, fill: "#cbd5e1" }}
            />
            <YAxis
              yAxisId="left"
              width={27}
              axisLine={false}
              tick={{ fontSize: 15, fill: "#cbd5e1" }}
              tickLine={false}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              width={23}
              axisLine={false}
              tick={{ fontSize: 10, fill: "#cbd5e1" }}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            {displayState.accuracy && (
              <Line
                yAxisId="right"
                label="Accuracy"
                type="monotone"
                dataKey="Accuraccy"
                stroke="#84cc16"
                strokeWidth={1.5}
                dot={false}
              />
            )}
            {displayState.error && (
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="Error"
                stroke="#b91c1c"
                strokeWidth={1.5}
                dot={false}
              />
            )}
            {displayState.net && (
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="Net"
                stroke="#ffffff"
                strokeWidth={3}
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
        <div className=" w-full text-gray-500 flex justify-evenly">
          <span
            className={` font-bold hover:bg-gray-500 rounded-lg p-1 ${
              displayState.accuracy ? "text-green-400" : null
            } `}
            onClick={() =>
              setDisplayState((prev) => ({ ...prev, accuracy: !prev.accuracy }))
            }
          >
            Accuracy
          </span>
          <span
            className={` font-bold hover:bg-gray-500 rounded-lg p-1 ${
              displayState.net ? "text-white" : null
            } `}
            onClick={() =>
              setDisplayState((prev) => ({ ...prev, net: !prev.net }))
            }
          >
            Net Wpm
          </span>
          <span
            className={` font-bold hover:bg-gray-500 rounded-lg p-1 ${
              displayState.error ? "text-red-400" : null
            } `}
            onClick={() =>
              setDisplayState((prev) => ({ ...prev, error: !prev.error }))
            }
          >
            Error
          </span>
        </div>
      </div>
    </div>
  );
}

export default MyLineChart;
