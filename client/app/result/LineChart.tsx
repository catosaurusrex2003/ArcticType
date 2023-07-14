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
              tick={{ fontSize: 15, fill: "#ffffff" }}
            />
            <YAxis
              yAxisId="left"
              width={27}
              axisLine={false}
              tick={{ fontSize: 15, fill: "#ffffff" }}
              tickLine={false}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              width={23}
              axisLine={false}
              tick={{ fontSize: 10, fill: "#ffffff" }}
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
                stroke="rgb(203 213 225)"
                strokeWidth={3}
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
        <div className=" w-full text-gray-500 my-4 flex justify-evenly">
          <span
            className={`bg-gray-900 text-sm hover:bg-donkey-navyBlue cursor-pointer rounded-lg p-1 px-2 ${
              displayState.accuracy ? "text-green-400" : null
            } `}
            onClick={() =>
              setDisplayState((prev) => ({ ...prev, accuracy: !prev.accuracy }))
            }
          >
            Accuracy
          </span>
          <span
            className={`bg-gray-900 text-sm hover:bg-donkey-navyBlue cursor-pointer rounded-lg p-1 px-2 ${
              displayState.net ? "text-white" : null
            } `}
            onClick={() =>
              setDisplayState((prev) => ({ ...prev, net: !prev.net }))
            }
          >
            Net Wpm
          </span>
          <span
            className={`bg-gray-900 text-sm hover:bg-donkey-navyBlue cursor-pointer rounded-lg p-1 px-2 ${
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
