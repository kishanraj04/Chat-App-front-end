import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useGetGroupDataQuery, useGetMyChatsQuery } from "../../store/api/api";
import { getSocket } from "../../context/SocketProvider";
import { useState } from "react";
import { useEffect } from "react";
import { currentGrousMembers, setClickedGroupId } from "../../store/reducers/tmpvariable";

function GroupMembers() {
  const { _id: loginUserId } = useSelector((state) => state.auth);
  const { data: chat } = useGetMyChatsQuery();
  const [newGroups, setNewGroups] = useState([]);
  const socket = getSocket();
  const dispatch = useDispatch();

 

  useEffect(() => {
    if (!socket) return;

    const handleGroupCreation = (newGroup) => {
      if (!newGroup.avatar || newGroup.avatar.length === 0) {
        newGroup.avatar = new Array(newGroup.members.length).fill("");
      }
      setNewGroups((prev) => [...prev, newGroup]);
    };
    const handleNewNotification = (newNotification) => {
      console.log("noti ", newNotification);
    };

    socket.on("GROUP_CREATE", handleGroupCreation);
    socket.on("GROUP_NOTIFICATION", handleNewNotification);

    return () => {
      socket.off("GROUP_CREATE", handleGroupCreation);
    };
  }, [socket]);

  // Combine initial and new group chats
  const groupChats = [
    ...(chat?.transformchats?.filter((c) => c.groupchat) || []),
    ...newGroups,
  ];

  useEffect(()=>{
    dispatch(currentGrousMembers(groupChats))
  },[groupChats])

  return (
    <div className="bg-gray-900 w-full h-[100vh]">
      {groupChats.length === 0 ? (
        <p className="text-center text-gray-400">No Groups Found</p>
      ) : (
        groupChats.map(({ _id, groupname, avatar }) => (
          <div
            key={_id}
            className="flex items-center h-[5rem] px-4 border-b gap-3 text-white font-serif"
            onClick={() => {
              dispatch(setClickedGroupId(_id));
            }}
          >
            <div className="relative h-12 w-[60px] flex items-center">
              {(Array.isArray(avatar) ? avatar : [avatar])
                .slice(0, 2)
                .map((url, idx) => (
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

            <div className="flex-1">
              <p className="text-base font-semibold truncate text-white font-serif">
                {groupname || "Unnamed Group"}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default GroupMembers;
