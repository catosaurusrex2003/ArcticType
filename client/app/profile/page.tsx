import Image from "next/image";
import React from "react";
import Progressbar from "@/components/progressbar";
import MyLineChart from "./LineChart";

function page() {
  const dummy = {
    username: "catousaurusrex",
    email: "mohdmehdi2003@gmail.com",
    picUrl: "",
    joiningDate: "Joined 22 Oct 2022",
    numberOfTests: 10,
    totalTime: 5570,
    score: 2324,
    records: {
      "15": {
        wpm: 50,
        acc: "75%",
      },
      "30": {
        wpm: 50,
        acc: "75%",
      },
      "60": {
        wpm: 50,
        acc: "75%",
      },
      "120": {
        wpm: 50,
        acc: "75%",
      },
    },
    avg_wpm: [
      60, 65, 62, 64, 63, 66, 67, 65, 63, 63, 60, 65, 62, 64, 63, 66, 67, 65,
      63, 63
    ],
  };
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
              <span className=" text-2xl font-semibold">{dummy.username}</span>
              <span className="text-xs font-medium">{dummy.joiningDate}</span>
            </div>
          </div>
          <div>
            <Progressbar />
          </div>
        </div>
        {/* right part */}
        <div className="md:w-1/2 flex flex-col md:flex-row md:justify-evenly">
          <div className="flex flex-col justify-center ms-10 md:md-0 md:items-center mt-5 md:mt-0">
            <span className=" text-sm opacity-80">tests started</span>
            <span className=" text-3xl font-semibold">158</span>
          </div>
          <div className="flex flex-col justify-center ms-10 md:md-0 md:items-center mt-5 md:mt-0">
            <span className=" text-sm opacity-80">typing time</span>
            <span className=" text-3xl font-semibold">1:22:35</span>
          </div>
        </div>
      </div>
      {/* bottom strip */}
      <div className="w-3/4 bg-donkey-dark-purple flex flex-col justify-center rounded-xl md:flex-row py-5 mt-5">
        <div className="md:w-3/4 flex flex-col md:flex-row md:justify-evenly">
          <div className="flex flex-col justify-center md:md-0 md:items-center mt-5 md:mt-0 text-center">
            <span className=" text-sm opacity-80">15 secs</span>
            <span className=" text-5xl font-semibold">85</span>
            <span className=" text-2xl font-medium">75%</span>
          </div>
          <div className="flex flex-col justify-center md:md-0 md:items-center mt-5 md:mt-0 text-center">
            <span className=" text-sm opacity-80">15 secs</span>
            <span className=" text-5xl font-semibold">85</span>
            <span className=" text-2xl font-medium">75%</span>
          </div>
          <div className="flex flex-col justify-center md:md-0 md:items-center mt-5 md:mt-0 text-center">
            <span className=" text-sm opacity-80">15 secs</span>
            <span className=" text-5xl font-semibold">85</span>
            <span className=" text-2xl font-medium">75%</span>
          </div>
          <div className="flex flex-col justify-center md:md-0 md:items-center mt-5 md:mt-0 text-center">
            <span className=" text-sm opacity-80">15 secs</span>
            <span className=" text-5xl font-semibold">85</span>
            <span className=" text-2xl font-medium">75%</span>
          </div>
        </div>
      </div>
      {/* bottom chart */}
      <div className="flex flex-col w-full mt-10 text-center">
        <p className=" text-2xl font-semibold mb-2">Performance</p>
        <MyLineChart finalData={dummy.avg_wpm}/>
      </div>
    </div>
  );
}

export default page;
