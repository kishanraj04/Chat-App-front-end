import React from "react";
import {
  useGetMyChatsQuery,
  useGetTotalNotificationQuery,
} from "../../store/api/api";
import { useDispatch, useSelector } from "react-redux";
import {
  setChatId,
  setMembers,
  setSearchUserName,
} from "../../store/reducers/tmpvariable";
import { getSocket } from "../../context/SocketProvider";
import { useEffect } from "react";
import { useState } from "react";

function ChatList({ data }) {
  const { data: chat } = useGetMyChatsQuery();
  const { chatId, _id } = useSelector((state) => state.tmp);
   const { _id:loginUserId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [totalNotificatio, setTotalNotification] = useState([]);
  const socket = getSocket();
  const { data: notifications } = useGetTotalNotificationQuery();
  console.log(loginUserId);
  useEffect(() => {
    if (totalNotificatio?.length == 0) {
      setTotalNotification(notifications?.totalNotification);
    }
  }, [notifications]);

  // console.log(notifications?.totalNotification,totalNotificatio);
  useEffect(() => {
    if (!socket) return;

    const newMessageAlert = (data) => {
      console.log(data);
      setTotalNotification(data?.notification);
    };

    socket.on("NOTIFICATION", newMessageAlert);
  }, [socket]);

  const getOponentUser = (member) => {
    return member[0]?.toString() != loginUserId
      ? member[0]?.toString()
      : member[1]?.toString();
  };

  const haldleClick = (_id,members) => {
    const oponent = getOponentUser(members);
    // console.log("lu ", loginUserId , oponent);
    socket.emit("clearNotification",{chatId,senderId:loginUserId,receiverId:oponent,members:[loginUserId,oponent]})
    dispatch(setChatId(_id));
    dispatch(setMembers(members));
  };

  return (
    <>
      {chat?.transformchats?.map(({ avatar, name, _id, members }) => (
        <div
          key={_id}
          className={`flex items-center h-[6rem] w-full px-4 gap-4 border-t-[1px] border-b[1px] text-white font-serif ${
            chatId === _id ? "bg-blue-900" : ""
          }`}
          onClick={()=>haldleClick(_id,members,loginUserId)}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* Profile Image */}
          <div
            className="h-16 w-16 rounded-full overflow-hidden flex-shrink-0"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <img
              src={avatar[0]}
              alt={name}
              className="h-full w-full object-cover"
            />
          </div>
          <p>{name}</p>
          {/* Name + Notification */}
          <p className="text-sm text-green-500">
            {_id.toString()==chatId?.toString()?0:(() => {
              const oponent = getOponentUser(members);
              const notif = totalNotificatio?.find(
                ({ senderId }) => senderId?.toString() === oponent
              );
              return notif?.totalNotifaction || 0;
            })()}
          </p>
        </div>
      ))}
    </>
  );
}

export default ChatList;
