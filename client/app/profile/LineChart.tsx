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
        <p className="label text-white">Test: {`${label}`}</p>
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

interface props {
  finalData: number[];
}

function MyLineChart({ finalData }: props) {
  const chartData = finalData.map((each, index) => ({
    test: index+1,
    wpm: each,
  }));
  return (
    <div className="flex justify-center">
      <div className="max-w-2xl flex flex-col w-full">
        <ResponsiveContainer width="100%" aspect={2.8}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="10 0 0" stroke="#5455576b" />
            <XAxis
              dataKey="test"
              width={23}
              axisLine={false}
              tick={{ fontSize: 15, fill: "#ffffff" }}
            />
            <YAxis
              width={27}
              axisLine={false}
              tick={{ fontSize: 15, fill: "#ffffff" }}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="wpm"
              stroke="#67e8f9"
              strokeWidth={4}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MyLineChart;
