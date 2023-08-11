import axiosBasicInstance from "@/config/axiosConfig";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

const presetPerPage = 5;

type LeaderboardData = {
  wpm: number;
  username: string;
  Date: string;
  picUrl: string;
};

function EachLeaderboardCategory({ categoryProps }: { categoryProps: number }) {
  const fetchPage = async (pageParam = 1) => {
    const res = await axiosBasicInstance.get("/getLeaderBoard", {
      params: {
        category: categoryProps,
        pageNumber: pageParam,
        perPage: presetPerPage,
      },
    });
    return res.data;
  };

  const { fetchNextPage, hasNextPage, data, isLoading, isFetchingNextPage } =
    useInfiniteQuery<LeaderboardData[]>(
      ["leaderboard", categoryProps],
      ({ pageParam = 1 }) => fetchPage(pageParam),
      {
        getNextPageParam: (lastPage, allPages) => {
          if (lastPage.length < presetPerPage) {
            return undefined;
          } else {
            return allPages.length + 1;
          }
        },
      }
    );
  return (
    <div className="w-full sm:w-5/6 md:w-3/5 xl:w-1/3 bg-glacier-primary mt-10 rounded-xl text-black">
      <p className="text-2xl font-bold  mt-3">Time {categoryProps}</p>
      <table className="w-full table-auto text-sm sm:text-base">
        <thead className="h-10">
          <tr>
            <th></th>
            <th>#</th>
            <th>username</th>
            <th>wpm</th>
            <th>date</th>
          </tr>
        </thead>
        {data?.pages.map((eachArray, index1) => {
          return eachArray.map((eachRow, index2) => (
            <tbody key={`${index1}-${index2}`}>
              <tr className="h-10 font-semibold text-xs sm:text-sm">
                <td className="flex justify-center items-center h-10">
                  <Image
                    className="rounded-full bg-gray-700 object-cover"
                    src={eachRow.picUrl || "/dummy-profile.png"}
                    height={25}
                    width={25}
                    alt=""
                  />
                </td>
                {/* rank */}
                <td className="">{presetPerPage * index1 + index2 + 1}</td>
                <td className="">{eachRow.username}</td>
                <td className="">{eachRow.wpm}</td>
                <td className="">{eachRow.Date}</td>
              </tr>
            </tbody>
          ));
        })}
        <tr>{!data?.pages[0].length && <td colSpan={5}>No Records</td>}</tr>
      </table>
      {hasNextPage && (
        <button
          className=" bg-glacier-secondary hover:bg-glacier-subprimary active:bg-glacier-primary text-white font-semibold mb-5 py-1 px-2 rounded-md text-sm"
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage ? "..." : "Load More"}
        </button>
      )}
    </div>
  );
}

export default EachLeaderboardCategory;

{
  /* <tbody key={index}>
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
            </tbody> */
}
