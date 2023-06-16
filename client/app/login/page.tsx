"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { useGlobalContext } from "@/context/globalContext";
import { useRouter } from "next/navigation";

function Page() {
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
    verifyPassword: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const {setAuth} = useGlobalContext()

  const router = useRouter()

  const signUpHandler = async () => {
    if (signUpData.username && signUpData.email && signUpData.password) {
      const registerData = _.omit(signUpData, "verifyPassword");
      const response = await axios.post(
        "http://localhost:3001/createUser",
        registerData
      );
      console.log(response)
      if(response.status == 200){
        setAuth(true)
        console.log("set true")
        router.push("/profile")
      }

    }
  };

  const loginHandler = async () => {
    if (loginData.email && loginData.password) {
      const response = await axios.post(
        "http://localhost:3001/loginUser",
        loginData
      );
      console.log(response)
      if(response.status == 200){
        setAuth(true)
        console.log("set true")
        router.push("/profile")
      }
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full flex flex-col md:flex-row mt-10 items-center justify-evenly ">
        {/* register */}
        <div className="w-64 text-slate-300 flex flex-col ">
          <p className=" text-donkey-rose font-medium text-2xl text-center">
            Register
          </p>
          <input
            className=" bg-background-dark-gray rounded-md px-2 py-2 my-1 text-white outline-none focus:border-2 focus:border-donkey-rose"
            placeholder="username"
            onChange={(e) =>
              setSignUpData((prev) => ({ ...prev, username: e.target.value }))
            }
          />
          <input
            className=" bg-background-dark-gray rounded-md px-2 py-2 my-1 text-white outline-none focus:border-2 focus:border-donkey-rose"
            placeholder="email"
            onChange={(e) =>
              setSignUpData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <input
            className=" bg-background-dark-gray rounded-md px-2 py-2 my-1 text-white outline-none focus:border-2 focus:border-donkey-rose"
            placeholder="password"
            type="password"
            onChange={(e) =>
              setSignUpData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <input
            className=" bg-background-dark-gray rounded-md px-2 py-2 my-1 text-white outline-none focus:border-2 focus:border-donkey-rose"
            placeholder="verify password"
            type="password"
            onChange={(e) =>
              setSignUpData((prev) => ({
                ...prev,
                verifyPassword: e.target.value,
              }))
            }
          />
          <button
            className=" bg-donkey-zaffre  hover:bg-donkey-dark-purple active:bg-black   p-2 w-full rounded-md mt-2"
            onClick={signUpHandler}
          >
            Sign Up
          </button>
        </div>
        {/* login */}
        <div className="w-64 text-slate-300 flex flex-col mt-10 md:mt-0 ">
          <p className=" text-donkey-rose font-medium text-2xl text-center">
            Login
          </p>
          <input
            className=" bg-background-dark-gray rounded-md px-2 py-2 my-1 text-white outline-none focus:border-2 focus:border-donkey-rose"
            placeholder="email"
            onChange={(e) =>
              setLoginData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <input
            className=" bg-background-dark-gray rounded-md px-2 py-2 my-1 text-white outline-none focus:border-2 focus:border-donkey-rose"
            placeholder="password"
            type="password"
            onChange={(e) =>
              setLoginData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <button
            className=" bg-donkey-zaffre  hover:bg-donkey-dark-purple active:bg-black   p-2 w-full rounded-md mt-2"
            onClick={loginHandler}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
