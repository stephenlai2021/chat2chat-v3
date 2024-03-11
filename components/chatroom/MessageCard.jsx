/* utils */
import moment from "moment";

/* next */
import Image from "next/image";

/* react-icons */
import { CiMenuKebab } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";

/* react */
import { useState } from "react";

/* components */
import DeleteMsgModal from "../modal/DeleteMsgModal";

function MessageCard({ message, me, other, others, deleteMsg }) {
  // console.log('other: ', other)

  const isMessageFromMe = message.sender === me.id;

  const [deleteMsgMenu, setDeleteMsgMenu] = useState(false);

  const formatTimeAgo = (timestamp) => {
    const date = timestamp?.toDate();
    const momentDate = moment(date);
    return momentDate.fromNow();
  };

  return (
    <div
      key={message.id}
      className={`
        ${isMessageFromMe ? "chat chat-end" : "chat chat-start"}
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
            {formatTimeAgo(message.time)}
          </time>
        </div>
        <div
          className={`
            ${
              isMessageFromMe
                ? "chat-bubble chat-bubble-accent"
                : "chat-bubble chat-bubble-primary"
            } 
            flex items-center justify-center
          `}
        >
          <img src={message.image} className="max-h-60 mb- rounded" />
          <p
            className={`text-wrap leading-tight min-w-[px] ${
              isMessageFromMe ? "text-accent-content" : "text-primary-content"
            }`}
          >
            {message.content}
          </p>

          {/* Message Sent Time */}
          {/* <div
            className={`text-xs mt-1 min-w-[60px] flex ${
              isMessageFromMe ? "text-accent-content" : "text-primary-content"
            }`}
          >
            {formatTimeAgo(message.time)}
          </div> */}
        </div>
        <div className="chat-footer opacity-50 ml-1 text-xs">Seen</div>

        {/* Delete Menu */}
        <div className="delete-menu">
          <CiMenuKebab
            className={`
            ${isMessageFromMe ? "right-[-8px] top-4" : "hidden"} 
            absolute w-5 h-5 hover:cursor-pointer text-warning opacity-50
          `}
            onClick={() => setDeleteMsgMenu(!deleteMsgMenu)}
          />
          <div
            className={`
            ${deleteMsgMenu ? "block" : "hidden"}
            flex p-2 bg-info rounded-box absolute right-4 top-6 bg-info
          `}
          >
            <h3 className="text-sm mr-2 text-info-content flex items-center">
              Delete?
            </h3>
            <div className="join">
              <button
                className="btn join-item btn-xs bg-error"
                onClick={() => deleteMsg(message.id)}
              >
                Yes
              </button>
              <button
                className="btn join-item btn-xs"
                onClick={() => setDeleteMsgMenu(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageCard;
