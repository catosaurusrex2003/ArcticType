"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import supabaseClient from "@/services/supabaseClient";
import RequestModal from "./requestModal";
import {
  useCompeteGeneralStore,
  requestState,
  othersCursorType,
  useCompeteGeneralStoreType,
} from "@/store/competeGeneralStore";
import UsernameModal from "./usernameModal";
import { shallow } from "zustand/shallow";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { getRoomUsersArray } from "@/utils/getRoomUsers";
import getText from "@/utils/getText";
import { whatMode } from "@/utils/what";
import { RealtimeChannel } from "@supabase/supabase-js";
import PersonelCounter from "./personelCounter";
import {
  removeUserDbMutation,
  testRunningDBUpdate,
} from "@/utils/supabaseDbMutation";
import { getRoomInfoDbUpdate } from "@/utils/supabaseDbQuery";
import { letterType } from "@/types/textArray";
import uuid from "react-uuid";
import Typingdiv from "./typingDiv";
import { errorToast } from "@/utils/toasts";

function Page() {
  const roomId = useParams().room;
  const router = useRouter();
  const [
    text,
    setText,

    textArray,
    replaceTextArray,
    setTextArray,

    username,
    setUsername,

    iStartedTest,
    setIStartedTest,

    requestState,
    setRequestState,

    testState,
    setTestState,

    othersCursor,
    mutateOthersCursor,
    clearOthersCursor,

    requestValidity,

    testDurationCompleted,
  ] = useCompeteGeneralStore(
    (store: useCompeteGeneralStoreType) => [
      store.text,
      store.setText,
      store.textArray,
      store.replaceTextArray,
      store.setTextArray,
      store.username,
      store.setUsername,
      store.iStartedTest,
      store.setIStartedTest,
      store.requestState,
      store.setRequestState,
      store.testState,
      store.setTestState,
      store.othersCursor,
      store.mutateOthersCursor,
      store.clearOthersCursor,
      store.requestValidity,
      store.testDurationCompleted,
    ],
    shallow
  );
  // on :/room without setting his username first
  const [usernameModal, setUsernameModal] = useState(false);
  // a list of online users in the :/room
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  // username of the person who started the test
  const [testStarterUsername, setTestStarterUsername] = useState<string | null>(
    null
  );
  // is running or not
  const [roomStatus, setRoomStatus] = useState<"RUNNING" | "NOTRUNNING">(
    "RUNNING"
  );
  // a state which holds the object of RealTimeChannel
  const [roomChannelState, setRoomChannelState] =
    useState<RealtimeChannel | null>();
  // by now you should know what this is
  // const [textArray, setTextArray] = useState<letterType[]>([]);
  // obvious hai bro
  // const [linesCompleted, setLinesCompleted] = useState<number>(0);

  const closeRequestModal = (state: requestState) => {
    console.log("request state set to ", state);
    setRequestState(state);
    setTestState("RUNNING");
  };
  const closeUsernameModal = (newUsername: string) => {
    if (newUsername) {
      setUsername(newUsername);
      setUsernameModal(false);
    }
  };

  const onPersonelTimerEnd = () => {
    // when timer ends
    setTestState("RUNNING");
    setRequestState("ACCEPTED");
  };

  // /api/getText
  const getRequiredText = async (roomConfig: {
    punctuation: boolean;
    number: boolean;
  }) => {
    // conditions for which type of text to fetch
    if (roomConfig) {
      const text = await getText({
        cat: "english",
        type: whatMode(roomConfig),
        length: 5,
      });
      return text;
    }
  };

  const startTest = async () => {
    // clear stuff from last test if any
    clearOthersCursor();
    // set iHaveStartedTest true
    setIStartedTest(true);
    // set the testStarted to true in database. this doesnt need to be synchronouse
    testRunningDBUpdate({ testState: true, roomId: roomId });
    // get room config
    const roomConfig = (await getRoomInfoDbUpdate(roomId)) as {
      punctuation: boolean;
      number: boolean;
    };
    // getText
    const text = await getRequiredText(roomConfig);
    // emit the request with text as payload
    if (roomChannelState) {
      roomChannelState.send({
        type: "broadcast",
        event: "testStarted",
        payload: {
          username: username,
          text: text,
        },
      });
    }
    setRequestState("ACCEPTED");
    // setText(text);
    setTestState("WAITING");
    // the timer is started where i consume the broadcast.
    // it emits to itself also so cleaner code
  };

  // create a rtc channel and listen
  useEffect(() => {
    // create a channel
    const roomChanel = supabaseClient.channel(roomId, {
      config: {
        broadcast: {
          self: true,
        },
      },
    });

    setRoomChannelState(roomChanel);

    if (username) {
      // subscribe to channel and add event listeners
      roomChanel
        // test start
        .on("broadcast", { event: "testStarted" }, (payload) => {
          const text = payload.payload.text as string;
          setText(text);
          const newArr: letterType[] = [];
          text.split("").map((each) => {
            const cache1 = uuid();
            newArr.push({
              id: cache1,
              letter: each,
              state: "pending",
              hidden: false,
              linebreak: false,
            });
          });
          replaceTextArray(newArr);
          console.log("set textArray");
          setTestStarterUsername(payload.payload.username);
          // bc pata nahi kyu ye devtools mai true dikha aha hai fir bhi yaha pe false hai. always
          if (iStartedTest) {
            setRequestState("ACCEPTED");
          } else {
            setRequestState("PENDING");
          }
        })

        // presence
        .on("presence", { event: "sync" }, () => {
          const newState = roomChanel.presenceState();
          const users = Object.keys(newState)
            .map((presenceId) => {
              const presences = newState[presenceId] as unknown as {
                username: string;
              }[];
              return presences.map((presence) => presence.username);
            })
            .flat();
          /* sort and set the users */
          setOnlineUsers(users.sort());
        })
        .on("presence", { event: "join" }, ({ key, newPresences }) => {
          // console.log("join presences: ", newPresences);
        })
        .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
          const usernameToRemove = leftPresences[0].username;
          if (usernameToRemove && roomId) {
            removeUserDbMutation({ usernameToRemove, roomId });
          }
        })
        // speed Update
        .on("broadcast", { event: "speedUpdate" }, (payload) => {
          const { username, index } = payload.payload;
          console.log(username, index);
          mutateOthersCursor({ username, index });
        })
        .subscribe(async (status) => {
          if (status === "SUBSCRIBED") {
            const presenceTrackState = await roomChanel.track({
              username: username,
            });
          }
        });
    } else {
      setUsernameModal(true);
    }

    return () => {
      supabaseClient.removeChannel(roomChanel);
      setRoomChannelState(null);
    };
  }, [username]);

  useEffect(() => {
    // get the rooms status
    (async () => {
      const { data, error } = await supabaseClient
        .from("channels")
        .select()
        .eq("roomId", roomId);
      // console.log("ALlRoomData is ", data);
      if (data?.length) {
        console.log(data[0].testRunning ? "RUNNING" : "NOTRUNNING");
        setRoomStatus(data[0].testRunning ? "RUNNING" : "NOTRUNNING");
      }
    })();

    const roomStatusChannel = supabaseClient
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "channels",
          filter: `roomId=eq.${roomId}`,
        },
        (payload) => {
          // handle the payload from db mutation
          if (payload.eventType == "UPDATE") {
            // status of the rooms running state changes
            setRoomStatus(payload.new.testRunning ? "RUNNING" : "NOTRUNNING");
          } else if (payload.eventType == "DELETE") {
            // the room is deleted by any chance.
            // this will happen when my postgresql function runs after it detects a room is inactive for a long time
            errorToast("room deleted");
            router.push("/compete");
          }
        }
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(roomStatusChannel);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center text-white">
      {/* displayed */}
      {requestState == "PENDING" && !iStartedTest && (
        <RequestModal
          username={testStarterUsername}
          isOpen={requestState == "PENDING" && !iStartedTest}
          closeModal={closeRequestModal}
          requestValidity={requestValidity}
        />
      )}
      {testState == "WAITING" && iStartedTest && (
        <PersonelCounter
          timeMax={requestValidity}
          onFinish={onPersonelTimerEnd}
          perSecond={() => {}}
          // reRenderProp={"rerenderprop"}
        />
      )}

      <UsernameModal isOpen={usernameModal} closeModal={closeUsernameModal} />
      {roomStatus == "NOTRUNNING" && (
        <button
          className="mx-auto bg-glacier-button-green hover:bg-glacier-button-green-hover active:bg-glacier-button-green-active text-black w-fit px-3 py-1 font-semibold rounded-sm"
          onClick={startTest}
        >
          start
        </button>
      )}
      {roomStatus == "RUNNING" && (
        <div className="flex flex-col w-fit mx-auto px-3 py-1 rounded-sm bg-slate-800 font-semibold">
          <span>match is</span>
          <span>ongoing</span>
        </div>
      )}
      {/* the person who started the test*/}
      {requestState == "ACCEPTED" && testState == "RUNNING" && (
        <>
          <Typingdiv
            roomChannelState={roomChannelState}
            textArray={textArray}
            setTextArray={setTextArray}
            // setLinesCompleted={setLinesCompleted}
          />
        </>
      )}
      {/* the stats */}
      {othersCursor.length > 0 && (
        <div className="flex flex-col items-center bg-glacier-subprimary  w-11/12 md:w-3/5 lg:w-2/5 mx-auto rounded-lg py-3 px-5 mt-14">
          <table className="w-full text-center">
            <thead className="border-b-2 border-slate-400 h-10">
              <tr>
                <th>#</th>
                <th>username</th>
                <th>progress</th>
                {testState == "RUNNING" && <th>wpm</th>}
              </tr>
            </thead>
            <tbody>
              {othersCursor.map((each: othersCursorType, index: number) => (
                <tr
                  key={index}
                  className={`${
                    index == 0 ? " text-yellow-400 font-semibold" : ""
                  } h-10 border-b-2 border-slate-600`}
                >
                  <td>{index + 1}</td>
                  <td>
                    <p className="relative w-fit mx-auto ">
                      {each.username}
                      {index == 0 && (
                        <img
                          className="absolute -top-1 h-4 -right-4  rotate-45"
                          src="/small-crown-3.png"
                        />
                      )}
                    </p>
                  </td>
                  <td>{Math.floor((each.index / text!.length) * 100)}%</td>
                  {testState == "RUNNING" && (
                    <td>
                      {Math.floor(
                        each.index / 5 / (testDurationCompleted / 60)
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* users in the room */}
      {username && (
        <div className="flex flex-col items-center bg-glacier-subprimary  w-11/12 md:w-4/5 mx-auto rounded-lg py-3 px-5 my-14">
          <span className="text-lg font-semibold">In the Room</span>
          <div className="flex flex-wrap justify-evenly w-full">
            {onlineUsers.map((eachUserName, index) => (
              <span
                key={index}
                className={` bg-glacier-primary text-black ${
                  eachUserName == username && "text-white"
                } font-semibold w-3/4 md:w-1/3 text-center rounded-sm p-2 my-2 mx-2`}
              >
                {eachUserName}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
