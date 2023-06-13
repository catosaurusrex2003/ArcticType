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
  data: scoreType[];
};

function MyLineChart({ data }: propsType) {
  const [displayState, setDisplayState] = useState({
    net: true,
    accuracy: true,
    error: false,
  });

  const finalData = data.map((each, index) => {
    // https://www.speedtypingonline.com/typing-equations
    // const netWPM = (((each.correct+each.wrong)/5)  - each.wrong )  * 60
    const total = each.wrong + each.correct;
    const netWPM = (total / 5) * 60;
    console.log(each.correct / total);
    return {
      time: index,
      Accuraccy: each.correct / total,
      Error: each.wrong / total,
      Net: netWPM,
    };
  });

  return (
    <div>
      <ResponsiveContainer width="100%" aspect={2.8} className=" max-w-2xl">
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
            />
          )}
          {displayState.error && (
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Error"
              stroke="#b91c1c"
              strokeWidth={1.5}
            />
          )}
          {displayState.net && (
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Net"
              stroke="#ffffff"
              strokeWidth={3}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MyLineChart;
