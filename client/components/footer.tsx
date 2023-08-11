import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="flex flex-wrap  justify-center md:justify-start fixed bottom-0 text-slate-400 text-sm pb-5 footer w-full">
      {/* 1 */}
      <div className="flex justify-evenly pt-3">
        <Link
          href="mailto:mohdmehdi2003@gmail.com"
          className="flex items-center mx-3"
        >
          <Image src="/footer/mail.svg" height={20} width={22} alt="" />
          <span className="mx-1">Contact</span>
        </Link>
        <Link
          href="https://github.com/catosaurusrex2003/ArcticType"
          className="flex items-center mx-3"
        >
          <Image src="/footer/code.svg" height={20} width={19} alt="" />
          <span className="mx-1">Source Code</span>
        </Link>
      </div>
      {/* 2 */}
      <div className="flex justify-evenly pt-3">
        <Link
          href="https://youtu.be/dQw4w9WgXcQ"
          className="flex items-center mx-3"
        >
          <Image src="/footer/discord.svg" height={20} width={23} alt="" />
          <span className="mx-1">Discord</span>
        </Link>
        <Link
          href="https://youtu.be/dQw4w9WgXcQ"
          className="flex items-center mx-3"
        >
          <Image src="/footer/page.svg" height={20} width={17} alt="" />
          <span className="mx-1">Terms</span>
        </Link>
      </div>
      {/* 3 */}
      <div className="flex justify-evenly pt-3">
        <Link
          href="https://youtu.be/dQw4w9WgXcQ"
          className="flex items-center mx-3"
        >
          <Image src="/footer/shield.svg" height={20} width={19} alt="" />
          <span className="mx-1">Security</span>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
