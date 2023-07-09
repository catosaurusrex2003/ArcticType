"use client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface useGeneralStoreType {
  auth: boolean;    
  setAuth: (newState: boolean) => void;
}

export const useGeneralStore = create<useGeneralStoreType>()(
  devtools(
    //
    (set) => ({
      auth: false,
      setAuth: (newState) => set({ auth: newState }),
    })
  )
);
