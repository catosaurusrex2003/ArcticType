"use client";
import axiosBasicInstance from "@/config/axiosConfig";
import { useGeneralStore } from "@/store/generalStore";
import { useModeStore } from "@/store/modeStore.tsx";
import { userType } from "@/types/user";
import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
// import keyboardBlack from "../components/keyboard-black.svg";

function Navbar() {
  const pathname = usePathname();
  
  const [auth, setAuth] = useGeneralStore((store)=>[store.auth, store.setAuth],shallow)


  const getUserData = async () => {
    try {
      const response = await axiosBasicInstance.get(
        `getUser`
      );
      if (response.status === 200) {
        const data = response.data;
        setAuth(data);
        return data;
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const verifyJWT = async () => {
    try {
      const result = await axiosBasicInstance.get(
        `isLoggedin`
      );
      if (result.status == 200  ) {
        // set the user data
        setAuth(result.data)
      }
    } catch (err:any) {
      console.log(err.response.data.message)
    }
  };

  useEffect(() => {
    // verify jwt and if the user is legit.
    // the get the users data and sets it to auth
    verifyJWT();
  }, []);

  const handleLogOut = async () => {
    const result = await axiosBasicInstance.get(
      `logoutUser`
    );
    setAuth(null);
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-row items-center justify-between w-full  sm:my-3  lg:w-4/5 ">
        {/* left side */}
        <div className="flex items-center sm:ms-8">
          <Link href="/">
            <div className="flex items-center ">
              <Image
                className="h-10 md:h-12 hidden sm:block"
                src="/keyboard-cyan.svg"
                height={100}
                width={100}
                alt="start typing"
              />
              <h1 className="relative text-lg text-glacier-accent md:text-3xl p-4 mt-3 sm:p-0 font-semibold">
                <span className="absolute text-xs top-0 sm:-top-3">Glide through</span>
                ArcticType
              </h1>
            </div>
          </Link>
          <Link href="/">
            <img
              className={`mx-2  hover:opacity-60 h-5 md:h-14 ${
                pathname == "/" ? "opacity-100" : "opacity-40"
              } `}
              src="/keyboard-cyan.svg"
              height={36}
              width={36}
              alt="start typing"
            />
          </Link>
          <Link href="/leaderboard">
            <img
              className={`mx-2  hover:opacity-60 h-5 md:h-14 ${
                pathname == "/leaderboard" ? "opacity-100" : "opacity-40"
              }`}
              src="/crown-cyan.svg"
              height={28}
              width={28}
              alt="leaderboard"
            />
          </Link>
          <Link href="/compete">
            <img
              className={`mx-2  hover:opacity-60 h-5 md:h-14 ${
                pathname == "/compete" ? "opacity-100" : "opacity-40"
              }`}
              src="/globe.svg"
              height={25}
              width={25}
              alt="leaderboard"
            />
          </Link>
          <Link href="/settings">
            <img
              className={`mx-2  hover:opacity-60 h-5 md:h-14 ${
                pathname == "/settings" ? "opacity-100" : "opacity-40"
              }`}
              src="/setting-cyan.svg"
              height={30}
              width={30}
              alt="setting"
            />
          </Link>
        </div>

        {/* right side */}
        <div className="flex sm:me-8 items-center">
          {auth ? (
            <Link
              href="/profile"
              className="flex items-center"
            >
              <span className="text-glacier-accent text-xs hidden sm:block font-semibold ">
                {auth?.username}
              </span>
              <Image
                className="mx-2 h-5 w-5 md:h-8 md:w-8 rounded-full"
                src={auth?.picUrl}
                height={30}
                width={30}
                alt="profile"
              />
            </Link>
          ) : (
            <Link href="/login">
              <Image
                className="mx-2  h-5 md:h-6 opacity-60 hover:opacity-100"
                src="/profile.svg"
                height={30}
                width={30}
                alt="profile"
              />
            </Link>
          )}
          {auth ? (
            <Link href="/login" onClick={handleLogOut}>
              <Image
                className="mx-2 opacity-60 hover:opacity-100  cursor-pointer h-5 md:h-7"
                src="/logout.svg"
                height={30}
                width={30}
                alt="logout"
              />
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
