"use client";
import React from "react";

function page() {

  return (
    <div className="flex justify-center">
      <div className="w-full flex flex-col md:flex-row justify-evenly">
        {/* register */}
        <div className="w-64 text-slate-300 flex flex-col ">
          <p className=" text-donkey-rose font-medium text-2xl text-center">
            Register
          </p>
          <input
            className=" bg-background-dark-gray rounded-md px-2 py-2 my-1 text-white outline-none focus:border-2 focus:border-donkey-rose"
            placeholder="username"
          />
          <input
            className=" bg-background-dark-gray rounded-md px-2 py-2 my-1 text-white outline-none focus:border-2 focus:border-donkey-rose"
            placeholder="email"
          />
          <input
            className=" bg-background-dark-gray rounded-md px-2 py-2 my-1 text-white outline-none focus:border-2 focus:border-donkey-rose"
            placeholder="password"
          />
          <input
            className=" bg-background-dark-gray rounded-md px-2 py-2 my-1 text-white outline-none focus:border-2 focus:border-donkey-rose"
            placeholder="verify password"
          />
          <button className=" bg-donkey-zaffre  hover:bg-donkey-dark-purple active:bg-black   p-2 w-full rounded-md mt-2">
            Sign Up
          </button>
        </div>
        {/* login */}
        <div className="w-64 text-slate-300 flex flex-col ">
          <p className=" text-donkey-rose font-medium text-2xl text-center">
            Login
          </p>
          <input
            className=" bg-background-dark-gray rounded-md px-2 py-2 my-1 text-white outline-none focus:border-2 focus:border-donkey-rose"
            placeholder="email"
          />
          <input
            className=" bg-background-dark-gray rounded-md px-2 py-2 my-1 text-white outline-none focus:border-2 focus:border-donkey-rose"
            placeholder="password"
          />
          <button className=" bg-donkey-zaffre  hover:bg-donkey-dark-purple active:bg-black   p-2 w-full rounded-md mt-2">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

export default page;
