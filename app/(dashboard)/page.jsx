"use client";

/* next */
import { usePathname } from "next/navigation";

/* hooks */
import useWindowSize from "@/hooks/useWindowSize";

/* react */
import { useState } from "react";

export default function DashoardPage() {
  const [windowSize, setWindowSize] = useState(null);

  const pathname = usePathname();
  // console.log("pathname: ", pathname);

  const size = useWindowSize();
  // console.log("window size: ", size);

  return (
    <div
      className={`
        shadow-inner w-full h-screen flex flex-col items-center justify-center
      `}
    >
      <img
        src="./undraw_chat_mobile-removebg.png"
        alt="cha illustration"
        className="max-w-[300px]"
      />
      {/* <p>pathname: {pathname}</p>
      <p>window width: {size.width}</p>
      <p>window height: {size.height}</p> */}
    </div>
  );
}
