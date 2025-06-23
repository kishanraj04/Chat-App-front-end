import React from "react";
import ChatList from "../Components/home/ChatList";
import ChatScreen from "../Components/home/ChatScreen";
import Profile from "../Components/home/Profile";
import { dummy } from "../Components/constants/dummy";
import moment from "moment";
import { getSocket } from "../context/SocketProvider";
import { useEffect } from "react";
function Home() {
  
 
  return (
    <div className="grid" style={{ gridTemplateColumns: "22% 48% 30%" }}>
      {/* chat list */}
      <div
        className="flex  flex-col gap-2 overflow-y-scroll border-r-[1px] h-[92vh] bg-neutral-800"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <ChatList />
      </div>

      {/* chat screen */}
      <div className="flex justify-center items-center">
        <ChatScreen />
      </div>

      {/* profile */}
      <div className="flex justify-center items-center border-l-[1px] h-[92vh] bg-neutral-800 text-gray-400">
        <Profile />
      </div>
    </div>
  );
}

export default Home;
