"use client";
import supabaseClient from "@/services/supabaseClient";
import { successToast } from "@/utils/toasts";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Switch from "react-switch";
import { useRouter } from "next/navigation";
import { useCompeteGeneralStore } from "@/store/competeGeneralStore";
import { Toaster } from "react-hot-toast";
import { getRoomUsersArray } from "@/utils/getRoomUsers";
import Link from "next/link";
import Image from "next/image";

function Page() {
  const router = useRouter();

  const setUsername = useCompeteGeneralStore((store) => store.setUsername);

  // formerror
  type formErrorType = {
    location:
      | "create-roomId"
      | "create-username"
      | "enter-roomId"
      | "enter-username"
      | "";
    errorMessage: string;
  };
  const [formError, setFormError] = useState<formErrorType>({
    location: "",
    errorMessage: "",
  });

  const [inputData, setInputData] = useState({
    create_roomId: "",
    create_username: "",
    enter_roomId: "",
    enter_username: "",
    numbers: false,
    punctuation: false,
  });

  const [onlineRooms, setOnlineRooms] = useState<
    {
      id: number;
      roomId: string;
      users: number;
      testRunning: boolean;
    }[]
  >([]);

  // get database tables stuff and subscribe to changes
  useEffect(() => {
    // get all the room data
    (async () => {
      const { data, error } = await supabaseClient.from("channels").select();
      // console.log("ALlRoomData is ", data);
      if (data) {
        setOnlineRooms(
          data.map((eachObj) => ({
            id: eachObj.id,
            roomId: eachObj.roomId,
            users: eachObj.usersInRoom.length,
            testRunning: eachObj.testRunning,
          }))
        );
      }
    })();

    const dbChangesChannel = supabaseClient
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "channels",
        },
        (payload) => {
          // handle the payload from db mutation
          if (payload.eventType == "INSERT") {
            // add new room to list
            setOnlineRooms((prev) => [
              ...prev,
              {
                id: payload.new.id,
                roomId: payload.new.roomId,
                users: payload.new.usersInRoom.length,
                testRunning: payload.new.testRunning,
              },
            ]);
          } else if (payload.eventType == "UPDATE") {
            // delete the object with id and replace it
            setOnlineRooms((prev) => {
              // _.remove(prev, (eachObj) => eachObj.id !== payload.new.id);
              const newArray = prev.filter((obj) => obj.id !== payload.new.id);
              return [
                ...newArray,
                {
                  id: payload.new.id,
                  roomId: payload.new.roomId,
                  users: payload.new.usersInRoom.length,
                  testRunning: payload.new.testRunning,
                },
              ];
            });
          } else if (payload.eventType == "DELETE") {
            // delete the object from the array
            setOnlineRooms((prev) => {
              console.log("before", prev);
              const newArray = prev.filter((obj) => obj.id !== payload.old.id);
              // _.remove(prev, (eachObj) => eachObj.id !== payload.old.id);
              return newArray;
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(dbChangesChannel);
    };
  }, []);

  const newChannelDbMutation = useMutation({
    mutationFn: async () => {
      if (inputData.create_roomId && inputData.create_username) {
        const { error } = await supabaseClient.from("channels").insert({
          roomId: inputData.create_roomId,
          punctuations: inputData.punctuation,
          numbers: inputData.numbers,
          testRunning: false,
          usersInRoom: [inputData.create_username],
        });

        if (error) {
          if (
            error.message ==
            'duplicate key value violates unique constraint "channels_roomId_key"'
          ) {
            setFormError({
              location: "create-roomId",
              errorMessage: "room already exists. use Enter",
            });
          }
          console.log(error);
          return false;
        } else return true;
      } else {
        if (!inputData.create_roomId) {
          setFormError({
            location: "create-roomId",
            errorMessage: "roomId required",
          });
        } else if (!inputData.create_username) {
          setFormError({
            location: "create-username",
            errorMessage: "username required",
          });
        }
        throw new Error("invalid input");
      }
    },
    onSuccess: () => {
      setUsername(inputData.create_username);
      successToast("roomCreated");
      router.push(`/compete/${inputData.create_roomId}`);
    },
  });

  const addUserDbMutation = useMutation({
    mutationFn: async () => {
      if (inputData.enter_roomId && inputData.enter_username) {
        const usersArray = await getRoomUsersArray(inputData.enter_roomId);
        if (usersArray) {
          if (usersArray.includes(inputData.enter_username)) {
            setFormError({
              location: "enter-username",
              errorMessage: "username already present in the room",
            });
          }
          const { error } = await supabaseClient
            .from("channels")
            .update({
              usersInRoom: [...usersArray, inputData.enter_username],
              last_modified: new Date().toISOString(),
            })
            .eq("roomId", inputData.enter_roomId);

          if (error) {
            console.log(error);
            throw new Error("something went wrong");
          }
        } else {
          setFormError({
            location: "enter-roomId",
            errorMessage: "no such room, create it",
          });
          throw new Error("no such room. create it");
        }
      } else {
        if (!inputData.enter_roomId) {
          setFormError({
            location: "enter-roomId",
            errorMessage: "roomId required",
          });
        } else if (!inputData.enter_username) {
          setFormError({
            location: "enter-username",
            errorMessage: "username required",
          });
        }
        throw new Error("invalid input");
      }
    },
    onSuccess: () => {
      setUsername(inputData.enter_username);
      successToast("entered Room");
      router.push(`/compete/${inputData.enter_roomId}`);
    },
  });

  return (
    <div className="flex flex-wrap justify-evenly items-center w-full">
      <Toaster />
      {/* create room */}
      <div className="w-64 text-slate-300 flex flex-col mt-10 md:mt-0 ">
        <p className=" text-glacier-accent2 font-medium text-2xl text-center">
          Create Room
        </p>
        <input
          className=" bg-glacier-subprimary rounded-md px-2 py-2 my-1 text-white outline-none focus:border-2 focus:border-glacier-accent2"
          placeholder="eg: mehdi room"
          value = {inputData.create_roomId}
          onChange={(e) => {
            const value = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
            setInputData((prev) => ({
              ...prev,
              create_roomId: value,
            }));
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              newChannelDbMutation.mutate();
            }
          }}
        />
        {formError.location == "create-roomId" && (
          <span className="text-red-600 text-xs font-semibold">
            {formError.errorMessage}
          </span>
        )}
        <input
          className=" bg-glacier-subprimary rounded-md px-2 py-2 my-1 text-white outline-none focus:border-2 focus:border-glacier-accent2"
          placeholder="eg: catosaurusrex"
          onChange={(e) =>
            setInputData((prev) => ({
              ...prev,
              create_username: e.target.value,
            }))
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              newChannelDbMutation.mutate();
            }
          }}
        />
        {formError.location == "create-username" && (
          <span className="text-red-600 text-xs font-semibold">
            {formError.errorMessage}
          </span>
        )}
        {/* toggle switches */}
        <div className=" w-full px-5">
          <label className="flex justify-between items-center text-slate-400 font-semibold w-full  my-2">
            <div className="tooltip-container">
              <span className="tooltip-trigger cursor-pointer">
                punctuations
              </span>
              <div className="tooltip-content">get punctuations in text</div>
            </div>
            <Switch
              onChange={() => {
                setInputData((prev) => ({
                  ...prev,
                  punctuation: !prev.punctuation,
                }));
              }}
              checked={inputData.punctuation}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={20}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={45}
              className="react-switch  flex"
              id="material-switch"
            />
          </label>
          <label className="flex justify-between items-center text-slate-400 font-semibold w-full  my-2">
            <div className="tooltip-container">
              <span className="tooltip-trigger cursor-pointer">numbers</span>
              <div className="tooltip-content">get numbers in text</div>
            </div>
            <Switch
              onChange={() => {
                setInputData((prev) => ({
                  ...prev,
                  numbers: !prev.numbers,
                }));
              }}
              checked={inputData.numbers}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={20}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={45}
              className="react-switch  flex"
              id="material-switch"
            />
          </label>
        </div>
        {/* {formError.location == "loginPassword" && (
            <span className="text-red-600 text-xs font-semibold">
              {formError.errorMessage}
            </span>
          )} */}
        <button
          className=" bg-glacier-primary hover:bg-gray-600 active:bg-black text-black font-semibold p-2 w-full rounded-md mt-2"
          onClick={() => newChannelDbMutation.mutate()}
        >
          Create
        </button>
      </div>
      {/* Enter room */}
      <div className="w-64 text-slate-300 flex flex-col justify-center mt-10 md:mt-0">
        <p className=" text-glacier-accent2 font-medium text-2xl text-center">
          Enter Room
        </p>
        <input
          className=" bg-glacier-subprimary rounded-md px-2 py-2 my-1 text-white outline-none focus:border-2 focus:border-glacier-accent2"
          placeholder="eg: mehdiRoom"
          value={inputData.enter_roomId}
          onChange={(e) => {
            const value = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
            setInputData((prev) => ({ ...prev, enter_roomId: value }));
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              addUserDbMutation.mutate();
            }
          }}
        />
        {formError.location == "enter-roomId" && (
          <span className="text-red-600 text-xs font-semibold">
            {formError.errorMessage}
          </span>
        )}
        <input
          className=" bg-glacier-subprimary rounded-md px-2 py-2 my-1 text-white outline-none focus:border-2 focus:border-glacier-accent2"
          placeholder="eg: catosaurusrex"
          onChange={(e) =>
            setInputData((prev) => ({
              ...prev,
              enter_username: e.target.value,
            }))
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              addUserDbMutation.mutate();
            }
          }}
        />
        {formError.location == "enter-username" && (
          <span className="text-red-600 text-xs font-semibold">
            {formError.errorMessage}
          </span>
        )}
        <button
          className=" bg-glacier-primary hover:bg-gray-600 active:bg-black text-black font-semibold p-2 w-full rounded-md mt-2"
          onClick={() => addUserDbMutation.mutate()}
        >
          Enter
        </button>
      </div>
      {/* list of online rooms */}
      <div className=" bg-glacier-primary flex flex-col items-center rounded-md w-72 my-10 py-3 ">
        {/* heading */}
        <span className="font-semibold w-5/6 text-center text-lg border-b-2 border-black">
          Online Rooms
        </span>
        {/* list */}
        <div className="w-5/6 h-52  overflow-y-scroll custom-scroll-bar text-center">
          {onlineRooms.length > 0 ? (
            onlineRooms?.map((eachRoom) => (
              <div
                key={eachRoom.id}
                className="flex justify-between items-center py-2 border-b-[1px] border-glacier-subprimary"
              >
                <div
                  className={`h-2 w-2 p-2 mx-1 ${
                    eachRoom.testRunning ? "bg-red-600" : "bg-green-600"
                  } rounded-full`}
                ></div>
                <span className="text-sm font-medium overflow-auto">
                  {eachRoom.roomId}
                </span>
                <div className="flex mx-1">
                  <Image src="/user.svg" height={10} width={10} alt="" />
                  <span className="text-xs">{eachRoom.users}</span>
                </div>
                <Link
                  href={`/compete/${eachRoom.roomId}`}
                  className=" text-xs font-medium px-2 py-1 mx-1 rounded-sm bg-glacier-button-green  hover:bg-glacier-button-green-hover active:bg-glacier-button-green-active active:text-white"
                >
                  JOIN
                </Link>
              </div>
            ))
          ) : (
            <span className="text-sm font-medium w-full">No rooms online</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
