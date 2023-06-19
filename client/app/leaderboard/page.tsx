"use client";
import Image from "next/image";
import React, { useState } from "react";

function Page() {
  const [data, setData] = useState([
    {
      time: 15,
      data: [
        {
          pfp: "",
          rank: 1,
          name: "catousaurusrex2003",
          wpm: 60,
          date: "31st oct 2023",
        },
        {
          pfp: "",
          rank: 2,
          name: "catousaurusrex2003",
          wpm: 60,
          date: "31st oct 2023",
        },
        {
          pfp: "",
          rank: 3,
          name: "catousaurusrex2003",
          wpm: 60,
          date: "31st oct 2023",
        },
        {
          pfp: "",
          rank: 4,
          name: "catousaurusrex2003",
          wpm: 60,
          date: "31st oct 2023",
        },
        {
          pfp: "",
          rank: 5,
          name: "catousaurusrex2003",
          wpm: 60,
          date: "31st oct 2023",
        },
      ],
    },
    {
      time: 30,
      data: [
        {
          pfp: "",
          rank: 1,
          name: "catousaurusrex2003",
          wpm: 60,
          date: "31st oct 2023",
        },
        {
          pfp: "",
          rank: 2,
          name: "catousaurusrex2003",
          wpm: 60,
          date: "31st oct 2023",
        },
        {
          pfp: "",
          rank: 3,
          name: "catousaurusrex2003",
          wpm: 60,
          date: "31st oct 2023",
        },
        {
          pfp: "",
          rank: 4,
          name: "catousaurusrex2003",
          wpm: 60,
          date: "31st oct 2023",
        },
        {
          pfp: "",
          rank: 5,
          name: "catousaurusrex2003",
          wpm: 60,
          date: "31st oct 2023",
        },
      ],
    },
    {
      time: 60,
      data: [
        {
          pfp: "",
          rank: 1,
          name: "catousaurusrex2003",
          wpm: 60,
          date: "31st oct 2023",
        },
        {
          pfp: "",
          rank: 2,
          name: "catousaurusrex2003",
          wpm: 60,
          date: "31st oct 2023",
        },
        {
          pfp: "",
          rank: 3,
          name: "catousaurusrex2003",
          wpm: 60,
          date: "31st oct 2023",
        },
        {
          pfp: "",
          rank: 4,
          name: "catousaurusrex2003",
          wpm: 60,
          date: "31st oct 2023",
        },
        {
          pfp: "",
          rank: 5,
          name: "catousaurusrex2003",
          wpm: 60,
          date: "31st oct 2023",
        },
      ],
    },
    {
      time: 120,
      data: [
        {
          pfp: "",
          rank: 1,
          name: "catousaurusrex2003",
          wpm: 60,
          date: "31st oct 2023",
        },
        {
          pfp: "",
          rank: 2,
          name: "catousaurusrex2003",
          wpm: 60,
          date: "31st oct 2023",
        },
        {
          pfp: "",
          rank: 3,
          name: "catousaurusrex2003",
          wpm: 60,
          date: "31st oct 2023",
        },
        {
          pfp: "",
          rank: 4,
          name: "catousaurusrex2003",
          wpm: 60,
          date: "31st oct 2023",
        },
        {
          pfp: "",
          rank: 5,
          name: "catousaurusrex2003",
          wpm: 60,
          date: "31st oct 2023",
        },
      ],
    },
  ]);

  return (
    <div className="flex flex-col justify-center items-center text-center">
      <p className="text-5xl text-donkey-rose font-bold mt-10">LeaderBoard</p>
      {/* each section */}
      <div className="flex flex-col xl:flex-row w-full justify-evenly items-center flex-wrap">
        {/* each category */}
        <div className="w-full sm:Lw-5/6 md:w-3/5 xl:w-1/3 bg-donkey-dark-purple mt-10 rounded-xl text-white">
          <p className="text-2xl font-bold  mt-5 ">Time {data[0].time}</p>
          <table className="w-full table-auto  text-sm sm:text-base">
            <thead className="h-14">
              <tr>
                <th></th>
                <th>#</th>
                <th>Name</th>
                <th>WPM</th>
                <th>Date</th>
              </tr>
            </thead>
            {data[0].data.map((each,index) => (
              <tbody key={index}>
                <tr className="h-10 font-semibold text-xs sm:text-sm">
                  <td className="flex justify-center items-center h-10">
                    <Image
                      className="rounded-full bg-gray-700"
                      src="/dummy-profile.png"
                      height={25}
                      width={25}
                      alt=""
                    />
                  </td>
                  <td className="">{each.rank}</td>
                  <td className="">{each.name}</td>
                  <td className="">{each.wpm}</td>
                  <td className="">{each.date}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        {/* each category */}
        <div className="w-full sm:Lw-5/6 md:w-3/5 xl:w-1/3 bg-donkey-dark-purple mt-10 rounded-xl text-white">
          <p className="text-2xl font-bold  mt-5 ">Time {data[1].time}</p>
          <table className="w-full table-auto  text-sm sm:text-base">
            <thead className="h-14">
              <tr>
                <th></th>
                <th>#</th>
                <th>Name</th>
                <th>WPM</th>
                <th>Date</th>
              </tr>
            </thead>
            {data[1].data.map((each,index) => (
              <tbody key={index}>
                <tr className="h-10 font-semibold text-xs sm:text-sm">
                  <td className="flex justify-center items-center h-10">
                    <Image
                      className="rounded-full bg-gray-700"
                      src="/dummy-profile.png"
                      height={25}
                      width={25}
                      alt=""
                    />
                  </td>
                  <td className="">{each.rank}</td>
                  <td className="">{each.name}</td>
                  <td className="">{each.wpm}</td>
                  <td className="">{each.date}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
      {/* each section */}
      <div className="flex flex-col xl:flex-row w-full justify-evenly items-center flex-wrap mb-10">
        {/* each category */}
        <div className="w-full sm:Lw-5/6 md:w-3/5 xl:w-1/3 bg-donkey-dark-purple mt-10 rounded-xl text-white">
          <p className="text-2xl font-bold  mt-5 ">Time {data[2].time}</p>
          <table className="w-full table-auto  text-sm sm:text-base">
            <thead className="h-14">
              <tr>
                <th></th>
                <th>#</th>
                <th>Name</th>
                <th>WPM</th>
                <th>Date</th>
              </tr>
            </thead>
            {data[0].data.map((each,index) => (
              <tbody  key={index}>
                <tr className="h-10 font-semibold text-xs sm:text-sm">
                  <td className="flex justify-center items-center h-10">
                    <Image
                      className="rounded-full bg-gray-700"
                      src="/dummy-profile.png"
                      height={25}
                      width={25}
                      alt=""
                    />
                  </td>
                  <td className="">{each.rank}</td>
                  <td className="">{each.name}</td>
                  <td className="">{each.wpm}</td>
                  <td className="">{each.date}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        {/* each category */}
        <div className="w-full sm:Lw-5/6 md:w-3/5 xl:w-1/3 bg-donkey-dark-purple mt-10 rounded-xl text-white">
          <p className="text-2xl font-bold  mt-5 ">Time {data[3].time}</p>
          <table className="w-full table-auto  text-sm sm:text-base">
            <thead className="h-14">
              <tr>
                <th></th>
                <th>#</th>
                <th>Name</th>
                <th>WPM</th>
                <th>Date</th>
              </tr>
            </thead>
            {data[0].data.map((each,index) => (
              <tbody key={index}>
                <tr className="h-10 font-semibold text-xs sm:text-sm">
                  <td className="flex justify-center items-center h-10">
                    <Image
                      className="rounded-full bg-gray-700"
                      src="/dummy-profile.png"
                      height={25}
                      width={25}
                      alt=""
                    />
                  </td>
                  <td className="">{each.rank}</td>
                  <td className="">{each.name}</td>
                  <td className="">{each.wpm}</td>
                  <td className="">{each.date}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Page;
