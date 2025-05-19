import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { CiCirclePlus, CiSearch } from "react-icons/ci";
import { IoIosContacts, IoMdLogOut } from "react-icons/io";
import { IoNotificationsCircleOutline } from "react-icons/io5";

const ChatHeader = () => {
  return (
  <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white grid min-h-[3.5rem]" style={{ gridTemplateColumns: "10% 70% 20%" }}>
  <div className="flex justify-center items-center">HeyChat</div>

  <div className="flex justify-end">
   <div className="grid grid-cols-5 gap-4 justify-end items-center w-[35%]">
     <CiSearch size={"2rem"}/>
    <CiCirclePlus size={"2rem"}/>
    <IoIosContacts size={"2rem"}/>
    <IoNotificationsCircleOutline size={"2rem"}/>
    <IoMdLogOut size={"2rem"}/>
   </div>
  </div>

  <div className="flex justify-around items-center pr-4">
    <div className="rounded-full border-[1px] flex justify-center items-center h-[80%] w-[25%] text-xs">
        avatar
    </div>
  </div>
</header>

  );
};

export default ChatHeader;
