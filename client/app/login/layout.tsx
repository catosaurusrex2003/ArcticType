"use client";
import { useGeneralStore } from "@/store/generalStore";
import { redirect } from "next/navigation";
import React from "react";

// PROTECTED ROUTE
function Layout({ children }: { children: React.ReactNode }) {
  const auth = useGeneralStore((store) => store.auth);
  if (auth) redirect("/profile");
  else return <div>{children}</div>;
}

export default Layout;
