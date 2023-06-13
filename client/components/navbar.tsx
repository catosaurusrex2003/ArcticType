import Image from "next/image";
import Link from "next/link";
import React from "react";
// import keyboardBlack from "../components/keyboard-black.svg";

function Navbar() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-row items-center justify-between w-full lg:w-4/5">
        {/* left side */}
        <div className="flex items-center sm:ms-8">
          <Link href="/">
            <div className="flex items-center ">
              <Image
                className="h-14 md:h-20 hidden sm:block"
                src="/keyboard-yellow.svg"
                height={100}
                width={100}
                alt="start typing"
              />
              <h1 className="text-lg md:text-3xl p-4 sm:p-0 text-stone-300 font-semibold">
                DonkeyType
              </h1>
            </div>
          </Link>
          <Link href="/">
            <Image
              className="mx-2 opacity-40 h-5 md:h-14"
              src="/keyboard-white.svg"
              height={30}
              width={30}
              alt="start typing"
            />
          </Link>
          <Image
            className="mx-2 opacity-40 h-5 md:h-20"
            src="/crown.svg"
            height={30}
            width={30}
            alt="leaderboard"
          />
          <Image
            className="mx-2 opacity-40 h-5 md:h-7"
            src="/setting.svg"
            height={30}
            width={30}
            alt="setting"
          />
        </div>

        {/* right side */}
        <div className="flex sm:me-8 items-center">
          <div className="flex items-center">
            <Image
              className="mx-2 opacity-40 h-5 md:h-6"
              src="/profile.svg"
              height={30}
              width={30}
              alt="profile"
            />
            <span className="text-white text-xs hidden sm:block font-semibold opacity-70">
              catousaurusrex
            </span>
          </div>
          <Image
            className="mx-2 opacity-40 h-5 md:h-7"
            src="/logout.svg"
            height={30}
            width={30}
            alt="logout"
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
