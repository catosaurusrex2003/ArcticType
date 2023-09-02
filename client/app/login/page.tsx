"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import { errorToast, successToast } from "@/utils/toasts";
import { useGeneralStore } from "@/store/generalStore";
import axiosBasicInstance from "@/config/axiosConfig";

function Page() {

  const setAuth = useGeneralStore((store)=>store.setAuth)


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

  type formErrorType = {
    location:
      | "registerUsername"
      | "registerEmail"
      | "registerPassword"
      | "registerVerifyPassword"
      | "loginEmail"
      | "loginPassword"
      | "";
    errorMessage: string;
  };

  const [formError, setFormError] = useState<formErrorType>({
    location: "",
    errorMessage: "",
  });


  const router = useRouter();

  function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
    }
  };

  const signUpHandler = async () => {
    setFormError({
      location: "",
      errorMessage: "",
    });
    if (signUpData.username && signUpData.email && signUpData.password) {
      if (!(signUpData.password == signUpData.verifyPassword)) {
        setFormError({
          location: "registerVerifyPassword",
          errorMessage: "passwords dont match",
        });
        return;
      }
      try {
        if (!isValidEmail(signUpData.email)) {
          setFormError({
            location: "registerEmail",
            errorMessage: "email is sus",
          });
          return;
        }
        if (signUpData.username.length < 5) {
          setFormError({
            location: "registerUsername",
            errorMessage: "at least 5 characters",
          });
          return;
        }
        if (signUpData.password.length < 5) {
          setFormError({
            location: "registerPassword",
            errorMessage: "longer password pls",
          });
          return;
        }
        const registerData = _.omit(signUpData, "verifyPassword");
        const response =  await axiosBasicInstance.post(
          "/createUser",
          registerData
        )
        if (response.status == 200) {
          setAuth(response.data);
          successToast("Acccount Created");
          setTimeout(() => {
            router.push("/profile");
          }, 1000);
        }
      } catch (err: any) {
        if (err.response.data.message) {
          errorToast(err.response.data.message);
          return
        }
        if (err.response) {
          errorToast(err.response.data.issues[0].message);
          return
        }
      }
    } else {
      setFormError({
        location: "registerVerifyPassword",
        errorMessage: "please fill all value",
      });
    }
  };

  const loginHandler = async () => {
    if (loginData.email && loginData.password) {
      if (!isValidEmail(loginData.email)) {
        setFormError({
          location: "loginEmail",
          errorMessage: "email is sus",
        });
        return;
      }
      if (loginData.password.length < 5) {
        setFormError({
          location: "loginPassword",
          errorMessage: "longer password pls",
        });
        return;
      }
      try {
        const response = await axiosBasicInstance.post(
          `loginUser`,
          loginData
        );
        if (response.status == 200) {
          setAuth(response.data)
          console.log("RESPONSE IS ============== ",response.data)
          successToast("Logged in");
          setTimeout(() => {
            router.push("/profile");
          }, 1000);
        } else {
        }
      } catch (err: any) {
        if (err.response.data.message) {
          errorToast(err.response.data.message);
          return
        }
        if (err.response) {
          errorToast(err.response.data.issues[0].message);
          return
        }
      }
    } else {
      setFormError({
        location: "loginPassword",
        errorMessage: "please fill all value",
      });
    }
  };

  return (
    <div className="flex justify-center">
      <Toaster />
      {/* register */}
      <div
        className="w-full flex flex-col md:flex-row mt-10 items-center justify-evenly "
        onChange={() => setFormError({ location: "", errorMessage: "" })}
      >
        <div className="w-64 text-slate-300 flex flex-col ">
          <p className=" text-glacier-accent2 font-medium text-2xl text-center">
            Register
          </p>
          <input
            className=" bg-glacier-subprimary rounded-md px-2 py-2 my-1 text-white outline-none focus:border-2 focus:border-glacier-accent2"
            placeholder="username"
            onChange={(e) =>
              setSignUpData((prev) => ({ ...prev, username: e.target.value }))
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                signUpHandler();
              }
            }}
          />
          {formError.location == "registerUsername" && (
            <span className="text-red-600 text-xs font-semibold">
              {formError.errorMessage}
            </span>
          )}
          <input
            className=" bg-glacier-subprimary rounded-md px-2 py-2 my-1 text-white outline-none focus:border-2 focus:border-glacier-accent2"
            placeholder="email"
            onChange={(e) =>
              setSignUpData((prev) => ({ ...prev, email: e.target.value }))
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                signUpHandler();
              }
            }}
          />
          {formError.location == "registerEmail" && (
            <span className="text-red-600 text-xs font-semibold">
              {formError.errorMessage}
            </span>
          )}
          <input
            className=" bg-glacier-subprimary rounded-md px-2 py-2 my-1 text-white outline-none focus:border-2 focus:border-glacier-accent2"
            placeholder="password"
            type="password"
            onChange={(e) =>
              setSignUpData((prev) => ({ ...prev, password: e.target.value }))
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                signUpHandler();
              }
            }}
          />
          {formError.location == "registerPassword" && (
            <span className="text-red-600 text-xs font-semibold">
              {formError.errorMessage}
            </span>
          )}
          <input
            className=" bg-glacier-subprimary rounded-md px-2 py-2 my-1 text-white outline-none focus:border-2 focus:border-glacier-accent2"
            placeholder="verify password"
            type="password"
            onChange={(e) =>
              setSignUpData((prev) => ({
                ...prev,
                verifyPassword: e.target.value,
              }))
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                signUpHandler();
              }
            }}
          />
          {formError.location == "registerVerifyPassword" && (
            <span className="text-red-600 text-xs font-semibold">
              {formError.errorMessage}
            </span>
          )}
          <button
            className=" bg-glacier-primary hover:bg-gray-600 active:bg-black text-black font-semibold p-2 w-full rounded-md mt-2"
            onClick={signUpHandler}
          >
            Sign Up
          </button>
        </div>
        {/* login */}
        <div className="w-64 text-slate-300 flex flex-col mt-10 md:mt-0 ">
          <p className=" text-glacier-accent2 font-medium text-2xl text-center">
            Login
          </p>
          <input
            className=" bg-glacier-subprimary rounded-md px-2 py-2 my-1 text-white outline-none focus:border-2 focus:border-glacier-accent2"
            placeholder="email"
            onChange={(e) =>
              setLoginData((prev) => ({ ...prev, email: e.target.value }))
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                loginHandler();
              }
            }}
          />
          {formError.location == "loginEmail" && (
            <span className="text-red-600 text-xs font-semibold">
              {formError.errorMessage}
            </span>
          )}
          <input
            className=" bg-glacier-subprimary rounded-md px-2 py-2 my-1 text-white outline-none focus:border-2 focus:border-glacier-accent2"
            placeholder="password"
            type="password"
            onChange={(e) =>
              setLoginData((prev) => ({ ...prev, password: e.target.value }))
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                loginHandler();
              }
            }}
          />
          {formError.location == "loginPassword" && (
            <span className="text-red-600 text-xs font-semibold">
              {formError.errorMessage}
            </span>
          )}
          <button
            className=" bg-glacier-primary hover:bg-gray-600 active:bg-black text-black font-semibold p-2 w-full rounded-md mt-2"
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
