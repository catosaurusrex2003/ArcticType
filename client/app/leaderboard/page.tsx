"use client";
import axiosBasicInstance from "@/config/axiosConfig";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosPromise } from "axios";
import Image from "next/image";
import React, { useState } from "react";
import EachLeaderboardCategory from "./eachLeaderboardCategory";

const presetPerPage = 2;

function Page() {
  const [tempdata, setData] = useState([
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
      tempdata: [
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

  // const fetchPage = async (pageParam = 1) => {
  //   const res = await axiosBasicInstance.get("/getLeaderBoard", {
  //     params: {
  //       category: 30,
  //       pageNumber: pageParam,
  //       perPage: presetPerPage,
  //     },
  //   });
  //   return res.data;
  // };

  // const {
  //   fetchNextPage,
  //   fetchPreviousPage,
  //   hasNextPage,
  //   hasPreviousPage,
  //   isFetchingNextPage,
  //   isFetchingPreviousPage,
  //   data,
  //   error,
  //   isError,
  //   isLoading,
  //   isSuccess,
  //   status,
  // } = useInfiniteQuery(
  //   ["leaderboard"],
  //   ({ pageParam = 1 }) => fetchPage(pageParam),
  //   {
  //     getNextPageParam: (lastPage, allPages) => {
  //       if (lastPage.length < presetPerPage) {
  //         console.log("reached the end")
  //         return undefined
  //       }
  //       else{
  //         console.log("returning",allPages.length + 1)
  //         return allPages.length + 1;
  //       }
  //     },
  //   }
  // );

  // console.log("Data is ",data?.pages)


  return (
    <div className="flex flex-col justify-center items-center text-center">
      <p className="text-5xl text-donkey-rose font-bold mt-10">LeaderBoard</p>
      {/* each section */}
      <div className="flex flex-col xl:flex-row w-full xl:justify-evenly items-center xl:items-start flex-wrap">
        {/* each category modified one */}
        <EachLeaderboardCategory  categoryProps={15}/>
        {/* each category */}
        <EachLeaderboardCategory  categoryProps={30}/>
      </div>
      {/* each section */}
      <div className="flex flex-col xl:flex-row w-full justify-evenly items-center flex-wrap mb-10">
        {/* each category */}
        <EachLeaderboardCategory  categoryProps={60}/>
        {/* each category */}
        <EachLeaderboardCategory  categoryProps={120}/>
      </div>
    </div>
  );
}

export default Page;
