"use client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {userType} from "@/types/user"

interface useGeneralStoreType {
  auth: userType|  null;
  setAuth: (newState: userType |  null) => void;
  text:string,
  setText:(newState:string)=>void
  prevStats:{wpm:number,acc:number}|null,
  setPrevStats:(newState:{wpm:number,acc:number}|null)=>void
}

export const useGeneralStore = create<useGeneralStoreType>()(
  devtools(
    //
    (set) => ({
      auth: null,
      setAuth: (newState) => set({ auth: newState }, false, "setAuth"),
      text:"",
      setText:(newState)=>set({text:newState}),
      prevStats:null,
      setPrevStats:(newState)=>set({prevStats:newState})
    })
  )
);