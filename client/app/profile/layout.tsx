"use client"
import { useGeneralStore } from "@/store/generalStore";
import { redirect } from "next/navigation";
import React from "react";

// PROTECTED ROUTE
function layout({ children }: { children: React.ReactNode }) {
  const auth = useGeneralStore((store) => store.auth);
  if (auth) return <div>{children}</div>;
  else  redirect("/login")
}

export default layout;
