// "use client";

/* react */
// import { useEffect, useState } from "react";

/* hooks */
// import useWindowSize from "@/hooks/useWindowSize";

export default async function DashoardPage() {
  const res = await fetch("http://localhost:3000/api/users");
  const users = await res.json();
  if (res.ok) console.log("all users: ", users);
  if (res.error) console.log(res.error);
  // const size = useWindowSize();
  // const [users, setUsers] = useState("");

  // const getUsers = async () => {
  //   const res = await fetch("/api/users");
  //   const users = await res.json();
  //   setUsers(users);
  //   if (res.ok) console.log("all users: ", users);
  //   if (res.error) console.log(res.error);
  // };

  // useEffect(() => {
  //   getUsers();
  // }, []);

  return (
    // ${
    //   size.width <= 800
    //     ? "hidden"
    //     : "w-full shadow-inner h-screen flex flex-col items-center justify-center"
    // } 
    <div
      className={`
        chatlist-mobile w-full shadow-inner h-screen flex flex-col items-center justify-center
      `}
    >
      {/* <img
        src="./undraw_chat_mobile-removebg.png"
        alt="cha illustration"
        className={`
          ${size.width <= 800 ? "hidden" : "max-w-[300px]"}          
        `}
      /> */}

      {users && (
        <pre className="h-screen overflow-y-auto">
          {JSON.stringify(users, null, 2)}
        </pre>
      )}
    </div>
  );
}
