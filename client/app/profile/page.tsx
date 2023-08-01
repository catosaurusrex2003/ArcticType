"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import Progressbar from "@/components/progressbar";
import MyLineChart from "./LineChart";
import { useQuery } from "@tanstack/react-query";
import axiosBasicInstance from "@/config/axiosConfig";
import { AxiosPromise } from "axios";
import { userType } from "@/types/user";
import Loadinganimation from "@/components/loading";

const secondsToHMS = (seconds: number | undefined): string => {
  if (seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
  return "";
};

const formatJoiningDate = (joiningDate: Date | string) => {
  return new Date(joiningDate).toDateString();
};



function page() {
  const getUserData = (): AxiosPromise => axiosBasicInstance.get("getUser");

  const { data, isLoading, error } = useQuery({
    queryKey: ["userData"],
    queryFn: getUserData,
    refetchOnWindowFocus:false,
    keepPreviousData:true,
  });

  const userData: undefined | userType = data?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loadinganimation />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center text-cyan-400 mb-20">
      {/* top strip */}
      <div className="w-3/4 bg-donkey-dark-purple flex flex-col rounded-xl md:flex-row py-5 mt-5">
        {/* left part */}
        <div className="md:w-1/2  flex flex-col">
          <div className="flex justify-evenly mb-2">
            <Image
              className="bg-gray-200 my-2 rounded-full md:h-24 md:w-24"
              src="/dummy-profile.png"
              height={50}
              width={50}
              alt=""
            />
            <div className="flex flex-col justify-center">
              <span className=" text-2xl font-semibold">
                {userData?.username}
              </span>
              <span className="text-xs font-medium">
                {userData?.joiningDate
                  ? formatJoiningDate(userData?.joiningDate)
                  : "---"}
              </span>
            </div>
          </div>
          <div>
            {userData && 
            <Progressbar score={userData?.score} />
            }
          </div>
        </div>
        {/* right part */}
        <div className="md:w-1/2 flex flex-col md:flex-row md:justify-evenly">
          <div className="flex flex-col justify-center ms-10 md:md-0 md:items-center mt-5 md:mt-0">
            <span className=" text-sm opacity-80">tests started</span>
            <span className=" text-3xl font-semibold">
              {userData?.numberOfTests || "-"}
            </span>
          </div>
          <div className="flex flex-col justify-center ms-10 md:md-0 md:items-center mt-5 md:mt-0">
            <span className=" text-sm opacity-80">typing time</span>
            <span className=" text-3xl font-semibold">
              {secondsToHMS(userData?.totalTime) || "-"}
            </span>
          </div>
        </div>
      </div>
      {/* bottom strip */}
      <div className="w-3/4 bg-donkey-dark-purple flex flex-col justify-center rounded-xl md:flex-row py-5 mt-5">
        <div className="md:w-3/4 flex flex-col md:flex-row md:justify-evenly">
          <div className="flex flex-col justify-center md:md-0 md:items-center mt-5 md:mt-0 text-center">
            <span className=" text-sm opacity-80">15 secs</span>
            <span className=" text-5xl font-semibold">
              {userData?.records[15].wpm || "-"}
            </span>
            <span className=" text-2xl font-medium">
              {userData?.records[15].acc || "-"}
            </span>
          </div>
          <div className="flex flex-col justify-center md:md-0 md:items-center mt-5 md:mt-0 text-center">
            <span className=" text-sm opacity-80">30 secs</span>
            <span className=" text-5xl font-semibold">
              {userData?.records[30].wpm || "-"}
            </span>
            <span className=" text-2xl font-medium">
              {userData?.records[30].acc || "-"}
            </span>
          </div>
          <div className="flex flex-col justify-center md:md-0 md:items-center mt-5 md:mt-0 text-center">
            <span className=" text-sm opacity-80">60 secs</span>
            <span className=" text-5xl font-semibold">
              {userData?.records[60].wpm || "-"}
            </span>
            <span className=" text-2xl font-medium">
              {userData?.records[60].acc || "-"}
            </span>
          </div>
          <div className="flex flex-col justify-center md:md-0 md:items-center mt-5 md:mt-0 text-center">
            <span className=" text-sm opacity-80">120 secs</span>
            <span className=" text-5xl font-semibold">
              {userData?.records[120].wpm || "-"}
            </span>
            <span className=" text-2xl font-medium">
              {userData?.records[120].acc || "-"}
            </span>
          </div>
        </div>
      </div>
      {/* bottom chart */}
      <div className="flex flex-col w-full mt-10 text-center">
        <p className=" text-2xl font-semibold mb-2">Performance</p>
        {userData?.avg_wpm.length ? (
          <MyLineChart finalData={userData.avg_wpm} />
        ) : (
          <h1>Attempt Tests to calculate performance</h1>
        )}
      </div>
    </div>
  );
}

export default page;
