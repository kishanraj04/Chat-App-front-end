import React, { useRef, useState } from "react";
import {
  useCreateGroupMutation,
  useGetMyFriendsQuery,
} from "../../store/api/api";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"; // React Icon
import { setClickedElement } from "../../store/reducers/tmpvariable";
import { toast } from "react-toastify";

function GroupDropDown() {
  const { chatId } = useSelector((state) => state?.tmp);
  const { data: mygroup, isLoading } = useGetMyFriendsQuery(chatId);
  const dispatch = useDispatch();
  const friends = mygroup?.firends || []; // double-check spelling!
  const [groupfriends, setGroupFriends] = useState([]);
  const groupName = useRef("");
  const [isCreate, setIsCreate] = useState(false);
  const [createGroup, createResp] = useCreateGroupMutation();
  console.log(createResp);
  //   handle group create
  const handleGroupCreate = async () => {
    try {
      const groupDetail = {
        groupname: groupName?.current?.value,
        members: groupfriends,
      };
      if (groupName?.current?.value == "") {
        toast.error("provide group name");
        return;
      }

      const toastId = toast.loading(`group creating`);
      const resp = await createGroup(groupDetail);
      if (resp?.data?.success) {
        toast.success(`group created`);
        toast.dismiss(toastId);
      }
      setIsCreate(false);
      // console.log(groupResp);
    } catch (error) {
      console.log(error?.message);
    }
  };

  console.log(groupfriends);
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-2 bg-white shadow rounded w-50">
      <h2 className="font-semibold text-lg mb-3 text-center">Friends</h2>
      {!isCreate ? (
        <ul className="space-y-3 max-h-64 overflow-auto pr-2">
          {friends.map((friend) => (
            <li
              key={friend._id}
              className="flex items-center justify-between gap-2 p-2 border rounded hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-medium">{friend.name}</span>
              </div>
              <button className="text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 flex items-center gap-1">
                {!groupfriends.includes(friend?._id) ? (
                  <AiOutlinePlus
                    size={16}
                    onClick={() => {
                      setGroupFriends((prev) => [...prev, friend?._id]);
                    }}
                  />
                ) : (
                  <AiOutlineMinus
                    size={16}
                    onClick={() => {
                      setGroupFriends((prev) =>
                        prev?.filter((id) => id != friend?._id)
                      );
                    }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="w-full flex justify-center">
          <input
            type="text"
            className="border-[1px] w-[90%] p-2"
            placeholder="Group Name"
            ref={groupName}
          />
        </div>
      )}

      {/* create group */}
      <div className="w-full flex justify-between font-serif p-2">
        <button
          className="border-[2px] pl-4 pr-4"
          onClick={() => dispatch(setClickedElement(""))}
        >
          Cancle
        </button>
        {!isCreate ? (
          <button
            disabled={groupfriends?.length < 2}
            className={`border-2 px-4 py-2 rounded 
    ${
      groupfriends?.length < 2
        ? "opacity-50 cursor-not-allowed"
        : "hover:bg-blue-500 hover:text-white"
    }
  `}
            onClick={() => setIsCreate(true)}
          >
            Next
          </button>
        ) : (
          <button
            disabled={groupfriends?.length < 2}
            className={`border-2 px-4 py-2 rounded 
    ${
      groupfriends?.length < 2
        ? "opacity-50 cursor-not-allowed"
        : "hover:bg-blue-500 hover:text-white"
    }
  `}
            onClick={() => {
              handleGroupCreate();
              dispatch(setClickedElement(""));
            }}
          >
            Create
          </button>
        )}
      </div>
    </div>
  );
}

export default GroupDropDown;
