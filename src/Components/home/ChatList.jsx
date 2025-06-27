import React, { useEffect, useRef, useState } from "react";
import {
  useGetMyChatsQuery,
  useGetTotalNotificationQuery,
} from "../../store/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setChatId, setMembers } from "../../store/reducers/tmpvariable";
import { getSocket } from "../../context/SocketProvider";

function ChatList() {
  const { data: chat } = useGetMyChatsQuery();
  const { chatId } = useSelector((state) => state.tmp);
  const { _id: loginUserId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [totalNotification, setTotalNotification] = useState([]);
  const [newGroups, setNewGroups] = useState([]);
  const socket = getSocket();
  const { data: notifications } = useGetTotalNotificationQuery();
  const hasSetNotifications = useRef(false);

  // Set initial notifications from server
  useEffect(() => {
    if (!hasSetNotifications.current && notifications?.totalNotification) {
      setTotalNotification(notifications.totalNotification);
      hasSetNotifications.current = true;
    }
  }, [notifications]);

  // Socket listeners
  useEffect(() => {
    if (!socket) return;

    const newMessageAlert = (data) => {
      console.log("NOTIFICATION:", data?.notification);
      setTotalNotification(data?.notification);
    };

    const handleGroupCreation = (newGroup) => {
      if (!newGroup.avatar || newGroup.avatar.length === 0) {
        newGroup.avatar = new Array(newGroup.members.length).fill("");
      }
      setNewGroups((prev) => [...prev, newGroup]);
    };

    const handleGroupNotification = (incoming) => {
      console.log("GROUP_NOTIFICATION:", incoming);
      setTotalNotification((prev) => {
        const exists = prev.find(
          (n) =>
            n.chatId?.toString() === incoming.chatId?.toString() &&
            n.receiverId?.toString() === incoming.receiverId?.toString()
        );
        if (exists) {
          return prev.map((n) =>
            n.chatId?.toString() === incoming.chatId?.toString() &&
            n.receiverId?.toString() === incoming.receiverId?.toString()
              ? { ...n, totalNotifaction: incoming.totalNotifaction }
              : n
          );
        } else {
          return [...prev, incoming];
        }
      });
    };

    socket.on("NOTIFICATION", newMessageAlert);
    socket.on("GROUP_CREATE", handleGroupCreation);
    socket.on("GROUP_NOTIFICATION", handleGroupNotification);

    return () => {
      socket.off("NOTIFICATION", newMessageAlert);
      socket.off("GROUP_CREATE", handleGroupCreation);
      socket.off("GROUP_NOTIFICATION", handleGroupNotification);
    };
  }, [socket]);

  const getOponentUser = (member) => {
    return member[0]?.toString() !== loginUserId
      ? member[0]?.toString()
      : member[1]?.toString();
  };

  const handleClick = (_id, members, groupchat) => {
    setTotalNotification([]);

    if (groupchat) {
      socket.emit("clearNotification", {
        chatId: _id,
        receiverId: loginUserId,
      });
    } else {
      const opponent = getOponentUser(members);
      socket.emit("clearNotification", {
        chatId: _id,
        receiverId: loginUserId,
        members: [loginUserId, opponent],
      });
    }

    dispatch(setChatId(_id));
    dispatch(setMembers(members));
  };

  const allChats = [...(chat?.transformchats || []), ...newGroups];

  return (
    <>
      {allChats.map(({ avatar, name, _id, members, groupname, groupchat }) => {
        const avatars = Array.isArray(avatar) ? avatar : [avatar];
        const notifCount = totalNotification?.find(
          (n) =>
            n.chatId?.toString() === _id?.toString() &&
            n.receiverId?.toString() === loginUserId?.toString()
        )?.totalNotifaction;

        return (
          <div
            key={_id}
            className={`flex items-center h-[6rem] w-full px-4 gap-4 border-t border-b text-white font-serif ${
              chatId === _id ? "bg-blue-900" : ""
            }`}
            onClick={() => handleClick(_id, members, groupchat)}
          >
            {/* Avatars */}
            {groupchat ? (
              <div className="relative h-12 w-[60px] flex items-center">
                {avatars.slice(0, 2).map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`member-${idx}`}
                    className="h-10 w-10 rounded-full object-cover border-2 border-white absolute"
                    style={{
                      left: `${idx * 20}px`,
                      zIndex: 2 - idx,
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
                {avatars[0] ? (
                  <img
                    src={avatars[0]}
                    alt={name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full rounded-full bg-gray-400" />
                )}
              </div>
            )}

            {/* Name + Notifications */}
            <div className="flex-1">
              <p className="text-base font-semibold truncate">
                {groupchat ? groupname : name}
              </p>
              {_id !== chatId && notifCount > 0 && (
                <p className="text-sm text-green-400">{notifCount}</p>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ChatList;
