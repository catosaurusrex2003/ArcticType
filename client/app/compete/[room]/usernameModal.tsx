"use client";
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { motion, AnimatePresence } from "framer-motion";
import { useCompeteGeneralStore } from "@/store/competeGeneralStore";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import supabaseClient from "@/services/supabaseClient";
import { errorToast, successToast } from "@/utils/toasts";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import { getRoomUsersArray } from "@/utils/getRoomUsers";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    border: "none",
    backgroundColor: "rgba(0, 0, 0, 0)",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};



type props = {
  isOpen: boolean;
  closeModal: (newUsername: string) => void;
};

function UsernameModal({ isOpen, closeModal }: props) {
  const roomId = useParams().room;
  const [localUsername, setLocalUsername] = useState("");

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

  const addUserDbMutation = useMutation({
    mutationFn: async () => {
      if (roomId && localUsername) {
        const usersArray = await getRoomUsersArray(roomId);
        if (usersArray) {
          if (usersArray.includes(localUsername)) {
            console.log("in");
            setFormError({
              location: "enter-username",
              errorMessage: "username already present in the room",
            });
            throw new Error("username already present");
          }
          const { error } = await supabaseClient
            .from("channels")
            .update({ usersInRoom: [...usersArray, localUsername] })
            .eq("roomId", roomId);

          if (error) {
            console.log(error);
            throw new Error("something went wrong");
          }
        } else {
          errorToast("no such room. create it");
          throw new Error("no such room. create it");
        }
      } else {
        if (!localUsername) {
          setFormError({
            location: "enter-username",
            errorMessage: "username required",
          });
        }
        throw new Error("invalid input");
      }
    },
    onSuccess: () => {
      successToast("entered Room");
      setTimeout(() => {
        console.log("close moda called");
        closeModal(localUsername);
      }, 1000);
    },
  });

  return (
    <>
      <Toaster />
      <Modal
        isOpen={isOpen}
        onRequestClose={() => closeModal("")}
        style={customStyles}
        ariaHideApp={false}
      >
        <AnimatePresence>
          <motion.div
            className="bg-glacier-subprimary text-white border-2 border-white px-10 w-60 sm:w-80  py-5 rounded-lg flex flex-col items-center justify-evenly text-sm font-semibold"
            initial={{ opacity: 0.6, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.6, scale: 0.99 }}
          >
            <p className=" text-glacier-accent2 font-medium text-2xl text-center">
              Enter Username
            </p>
            <input
              className=" bg-glacier-secondary rounded-md px-2 py-2 my-1 text-white outline-none focus:border-2 focus:border-glacier-accent2"
              placeholder="eg: catosaurusrex"
              onChange={(e) => setLocalUsername(e.target.value)}
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
            <Link
              className="text-white  text-xs mt-5 font-normal  hover:font-medium"
              href="/compete"
            >
              create a room?
            </Link>
          </motion.div>
        </AnimatePresence>
      </Modal>
    </>
  );
}

export default UsernameModal;
