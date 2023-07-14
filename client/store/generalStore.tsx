"use client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface useGeneralStoreType {
  auth: boolean;
  setAuth: (newState: boolean) => void;
  text:string,
  setText:(newState:string)=>void
  prevStats:{wpm:number,acc:number}|null,
  setPrevStats:(newState:{wpm:number,acc:number}|null)=>void
}

export const useGeneralStore = create<useGeneralStoreType>()(
  devtools(
    //
    (set) => ({
      auth: false,
      setAuth: (newState) => set({ auth: newState }, false, "setAuth"),
      text:"",
      setText:(newState)=>set({text:newState}),
      prevStats:null,
      setPrevStats:(newState)=>set({prevStats:newState})
    })
  )
);
