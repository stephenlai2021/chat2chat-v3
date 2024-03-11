"use client";

/* components */
import UsersCard from "./UsersCard";
import ThemeSwitcher from "../switcher/ThemeSwitcher";
import AddFriendModal from "../modal/AddFriendModal";

/* next */
import { useRouter } from "next/navigation";

/* utils */
import { languages } from "@/data/utils";

/* react-icons */
import { RxAvatar } from "react-icons/rx";
import { BsChatDots } from "react-icons/bs";
import { GrGroup } from "react-icons/gr";
import { MdGroupAdd } from "react-icons/md";
import { BsPersonAdd } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

/* zustand */
import { useStore } from "@/zustand/store";

export default function Sidabar({
  userData,
  activeTab,
  handleTabClick,
  logoutClick,
  logoutLoading,
}) {
  const router = useRouter();
  const {
    setSelectedChatroom,
    mobile,
    toggleMobile,
    userDataStore,
    setUserDataStore,
  } = useStore();


  const handleAddFriend = () => {
    router.push("/addfriend");
    toggleMobile();
  };

  const handleCreateGroup = () => {
    router.push("/creategroup");
    toggleMobile();
  };

  return (
    <div className="bg-base-30 w-[64px] shadow-inner h-full flex flex-col items-center sidebar-hide pt-3">
      {/* chat icon */}
      {/* <div
        className={`
        ${
          activeTab == "privateChat"
            ? "menu-left-active border-base-content"
            : ""
        } border- w-full py-3 px-5 flex items-center justify-center`}
      >
        <BsChatDots
          className={`w-[20px] h-[20px] hover:cursor-pointer text-base-content`}
          onClick={() => handleTabClick("privateChat")}
        />
      </div> */}

      {/* group icon */}
      {/* <div
        className={`${
          activeTab == "groupChat" ? "menu-left-active border-base-content" : ""
        } border- w-full py-3 px-5 flex items-center justify-center`}
      >
        <GrGroup
          className={`w-[20px] h-[20px] hover:cursor-pointer text-base-content`}
          onClick={() => handleTabClick("groupChat")}
        />
      </div> */}

      {/* add icon */}
      {/* ${
        activeTab == "add" ? "menu-left-active border-base-content" : ""
      }  */}
      <div
        className={`
          w-full mt-2 py- px-5 flex items-center justify-center
          tooltip tooltip-bottom
          border- border-red-30
        `}
        data-tip="Add Friend"
      >
        <BsPersonAdd
          className={`w-[23px] h-[23px] hover:cursor-pointer text-base-content`}
          onClick={() => document.getElementById("addFriendModal").showModal()}
        />
      </div>

      <div
        className={`
          w-full mt-8 py- px-5 flex items-center justify-center
          tooltip tooltip-bottom
          border- border-red-30
        `}
        data-tip="Create Group"
      >
        <AiOutlineUsergroupAdd
          className={`w-[23px] h-[23px] hover:cursor-pointer text-base-content`}
          // onClick={handleAddFriend}
        />
      </div>

      {/* Logout icon */}
      <div className="mt-auto mb-4 tooltip tooltip-top" data-tip="Logout">
        <div  
          className={`
            loading loading-spinner loading-xs text-base-content flex justify-center ml-2 opacity-30
            ${logoutLoading ? "block" : "hidden"}
          `}
        />
        <RiLogoutCircleRLine
          className={`
            w-[20px] h-[20px] hover:cursor-pointer text-base-content
            ${logoutLoading ? "hidden" : "block"}
          `}
          onClick={logoutClick}
        />
      </div>

      {/* Avatar Icon */}
      {/* <div className="flex-none mt-auto mb-3">
        <div className="drawer z-[200]">
          <input
            id="sidebar-drawer-settings"
            type="checkbox"
            className="drawer-toggle"
          />
          <div className="flex justify-center">
            <label
              htmlFor="sidebar-drawer-settings"
              aria-label="close sidebar"
              className="mx-2 py-2"
            >
              <RxAvatar className="w-[23px] h-[23px] hover:cursor-pointer text-base-content" />
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="sidebar-drawer-settings"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="pt-4 w-80 min-h-full bg-base-200 text-base-content">
              <UsersCard
                name={userData?.name}
                email={userData?.email}
                avatarUrl={userData?.avatarUrl}
                found={false}
              />
              <div className="divider" />
              <li>
                <ul className="menu bg-base-200 w-ful rounded-box">
                  <li>
                    <details>
                      <summary className="">Theme</summary>
                      <ThemeSwitcher />
                    </details>
                  </li>
                  <li>
                    <details>
                      <summary>Language</summary>
                      <ul>
                        {languages.map((language) => (
                          <li key={language.label}>
                            <a>{language.value}</a>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                  <div className="divider" />
                  <li>
                    <div onClick={logoutClick}>
                      {logoutLoading ? (
                        <div className="loading loading-spinner loading-xs text-base-content flex justify-center ml-2" />
                      ) : (
                        "Logout"
                      )}
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div> */}

      {/* User Info Modal */}
      {/* <dialog id="user-info-modal" className="modal">
        <div className="modal-box">
          <UsersCard
            name={userData?.name}
            email={userData?.email}
            avatarUrl={userData?.avatarUrl}
            found={false}
          />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog> */}

      <AddFriendModal
        id="addFriendModal"
        userData={userData}
      />
    </div>
  );
}
