/* utils */
import moment from "moment";

/* next */
import Image from "next/image";

/* react-icons */
import { CiMenuKebab } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";

/* react */
import { useState } from "react";

/* components */
import DeleteMsgModal from "../modal/DeleteMsgModal";

function MessageCard({ message, me, other, others, deleteMsg }) {
  // console.log('other: ', other)

  const isMessageFromMe = message.sender === me.id;

  const [deleteMsgMenu, setDeleteMsgMenu] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const getCurrentDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const currentDate = `${month}/${day}/${year}`;
    return currentDate;
  };

  const getYesterday = () => {
    const date = new Date();
    const day = date.getDate() - 1;
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const yesterday = `${month}/${day}/${year}`;
    return yesterday;
  };

  // Format: 03/12/2024
  const formatDate = (timestamp) => {
    const date = timestamp?.toDate();
    const momentDate = moment(date);
    return momentDate.format("l");
  };

  // 2:21PM
  const formatTimeClock = (timestamp) => {
    const date = timestamp?.toDate();
    const momentDate = moment(date);
    return momentDate.format("LT");
  };

  return (
    <div>
      <div className="divide flex justify-center text-xs opacity-50">
        {formatDate(message.time) == getCurrentDate()
          ? "Today"
          : formatDate(message.time) == getYesterday()
          ? "Yesterday"
          : formatDate(message.time).substring(
              0,
              formatDate(message.time).length - 5
              )
          // : moment(message?.time.toDate()).format("MMM Do")
        }
      </div>
      <div
        key={message.id}
        className={`
          ${isMessageFromMe ? "chat chat-end" : "chat chat-start"}
          border- border-red-30
        `}
      >
        {/* chat avatar */}
        {/* <div className="chat-avatar">
        {isMessageFromMe && (
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={me.avatarUrl} alt="Avatar" />
            </div>
          </div>
        )}

        {!isMessageFromMe && (
          <div className="avatar">
            <div className="w-10 rounded-full">
              {!loading && other.avatarUrl && (
                <img src={other.avatarUrl} alt="Avatar" />
              )}
            </div>
          </div>
        )}
      </div> */}

        {/* chat bubble */}
        <div className="relative">
          <div
            className={`
              chat-header flex ml-1
            `}
          >
            <time className="text-xs opacity-50">
              {formatTimeClock(message.time)}
            </time>
          </div>
          <div
            className={`
            ${
              isMessageFromMe
                ? "chat-bubble chat-bubble-accent"
                : "chat-bubble chat-bubble-primary"
            } 
            flex flex-col items-center justify-center
          `}
          >
            <img src={message.image} className="max-h-60 mb- rounded" />
            <p
              className={`
              text-wrap leading-tight min-w-[px] text-sm w-full pr-4
              ${
                isMessageFromMe ? "text-accent-content" : "text-primary-content"
              }
              ${message.image ? "mt-2" : "flex justify-start"}
            `}
            >
              {message.content}
            </p>
          </div>
          <div className="chat-footer opacity-50 ml-1 text-xs">Read</div>

          {/* Option Icon */}
          <div className="dropdown dropdown-top dropdown-end">
            <CiMenuKebab
              tabIndex={0}
              role="button"
              className={`
                  ${isMessageFromMe ? "left-[-20px]" : "hidden"} 
                  absolute top-[-65px] w-5 h-5 hover:cursor-pointer text-warning opacity-50
                `}
              onClick={() => setDeleteMsgMenu(!deleteMsgMenu)}
            />

            {/* Popup Menu */}
            <ul
              tabIndex={0}
              className={`
                dropdown-content z-[1] menu menu-horizontal
                flex bg-base-300 rounded-box shadow
              `}
            >
              <li>
                <a className="toolti tooltip-lef" data-tip="Edit">
                  <MdOutlineModeEditOutline className="w-5 h-5" />
                </a>
              </li>
              <li>
                <a className="toolti tooltip-lef" data-tip="Delete">
                  <MdOutlineDeleteOutline
                    className="w-5 h-5"
                    onClick={() => deleteMsg(message.id)}
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageCard;
