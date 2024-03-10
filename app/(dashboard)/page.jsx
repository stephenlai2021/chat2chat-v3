"use client";

/* hooks */
import useWindowSize from "@/hooks/useWindowSize";

export default function DashoardPage() {
  const size = useWindowSize();

  return (
    <div
      className={`
        ${
          size.width <= 800
            ? "w-0 h-0 hidden overflow-hidden"
            : "w-full shadow-inner h-screen flex flex-col items-center justify-center"
        }
        
      `}
    >
      <img
        src="./undraw_chat_mobile-removebg.png"
        alt="cha illustration"
        className={`
          ${size.width <= 800 ? "hidden" : "max-w-[300px]"}          
        `}
      />
    </div>
  );
}
