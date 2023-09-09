"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import supabaseClient from "@/services/supabaseClient";
import { useParams } from "next/navigation";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useCompeteGeneralStore } from "@/store/competeGeneralStore";

type eachMessageType = {
  username: string;
  message: string;
  time: string;
};

type eachMessageProps = {
  messageData: eachMessageType;
  orientation: "left" | "right";
};

function Message({ messageData, orientation }: eachMessageProps) {
  return (
    <div
      className={`flex flex-col w-2/3 bg-black text-black px-3 py-2 rounded-md my-2 ${
        orientation == "right"
          ? "ml-auto bg-white"
          : "mr-auto bg-glacier-accent"
      }`}
    >
      <p
        className={`w-full mr-auto font-normal text-xs ${
          orientation == "right" ? "text-right" : null
        } `}
      >
        {messageData.username}
      </p>
      <p
        className={`w-full mr-auto font-semibold text-sm ${
          orientation == "right" ? "text-right" : null
        } `}
      >
        {messageData.message}
      </p>
      <p
        className={`w-full font-normal text-xs ${
          orientation == "right" ? "text-left" : "text-right"
        }`}
      >
        {messageData.time}
      </p>
    </div>
  );
}

function ChatWidget() {
  const roomId = useParams().room;
  const [showChat, setShowChat] = useState<boolean>(false);
  const [roomChatChannelState, setRoomChatChannelState] =
    useState<RealtimeChannel | null>();
  const [messageText, setMessageText] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<eachMessageType[]>([]);
  const chatScrollDivRef = useRef<HTMLDivElement>(null);

  const [username] = useCompeteGeneralStore((store) => [store.username]);

  const demo1 = { username: "mohammed", time: "8:00pm", message: "asdasd" };

  function getCurrentTimeIn12HourFormat() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // "0" should be displayed as "12"

    // Add leading zero to minutes if needed
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Create the formatted time string
    const formattedTime = `${hours}:${formattedMinutes}${ampm}`;

    return formattedTime;
  }

  function scrollToBottom() {
    setTimeout(() => {
      if (chatScrollDivRef.current) {
        // chatScrollDivRef.current.scrollTop =
        //   chatScrollDivRef.current.scrollHeight;
        chatScrollDivRef.current.scrollTo({
          top: chatScrollDivRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);
  }

  const sendMessage = () => {
    if (roomChatChannelState && username && messageText) {
      const payload: eachMessageType = {
        username: username,
        message: messageText,
        time: getCurrentTimeIn12HourFormat(),
      };
      roomChatChannelState.send({
        type: "broadcast",
        event: "emitMessage",
        payload: payload,
      });
      setMessageText("");
    }
  };

  useEffect(() => {
    const roomChatChannel = supabaseClient.channel(`${roomId}-chat`, {
      config: {
        broadcast: {
          self: true,
        },
      },
    });

    setRoomChatChannelState(roomChatChannel);

    roomChatChannel
      .on("broadcast", { event: "emitMessage" }, (payload) => {
        console.log(payload.payload);
        setChatHistory((prev) => [...prev, payload.payload]);
        scrollToBottom();
      })
      .subscribe();

    return () => {
      supabaseClient.removeChannel(roomChatChannel);
    };
  }, []);

  return (
    <div className=" absolute bottom-10 right-10 z-10">
      <AnimatePresence>
        {showChat ? (
          // the square chat popup
          <motion.div
            className="flex flex-col items-center h-[30em] w-96 p-3 bg-glacier-dark rounded-xl relative"
            initial={{
              height: "0em",
              width: "0em",
              opacity: 0.5,
              scale: 0.7,
            }}
            animate={{
              height: "30em",
              width: "24em",
              opacity: 1,
              scale: 1,
            }}
            exit={{
              height: "0em",
              width: "0em",
              opacity: 0.5,
              scale: 0.7,
            }}
            transition={{ duration: 0.1 }}
          >
            <Image
              className="absolute top-4 left-4 hover:scale-110 transition-transform cursor-pointer"
              src="/chatwidget/cross.png"
              height={20}
              width={20}
              alt=""
              onClick={() => setShowChat(false)}
            />
            <p className="w-full text-center font-bold text-lg border-b-[1px] border-white pb-3">
              ROOM CHAT
            </p>
            <div
              className="h-full w-full overflow-y-scroll custom-scroll-bar"
              ref={chatScrollDivRef}
            >
              {chatHistory.map((each) => (
                <Message
                  messageData={each}
                  orientation={each.username == username ? "right" : "left"}
                />
              ))}
            </div>
            <div className="relative w-5/6">
              <input
                className="py-2 px-3 pr-10 w-full bg-[#564D89] rounded-lg"
                value={messageText}
                onChange={(e) => {
                  setMessageText(e.target.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    sendMessage();
                  }
                }}
              />
              <Image
                className="absolute right-0 top-1/2 transition-transform  -translate-x-1/2 -translate-y-1/2 hover:scale-110 cursor-pointer"
                src="/chatwidget/send.png"
                height={23}
                width={23}
                alt=""
                onClick={sendMessage}
              />
            </div>
          </motion.div>
        ) : (
          // widget image and circle thingy
          <div className="flex justify-center items-center h-[4.5em] w-[4.5em] h rounded-full  bg-glacier-dark hover:bg-glacier-dark-hover hover:cursor-pointer hover:border-[1px] border-white hover:scale-110 transition-transform">
            <Image
              className=""
              height={50}
              width={50}
              src="/chatwidget/chatIcon.png"
              alt=""
              onClick={() => setShowChat(true)}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ChatWidget;
