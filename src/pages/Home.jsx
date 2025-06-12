import React from "react";
import ChatList from "../Components/home/ChatList";
import ChatScreen from "../Components/home/ChatScreen";
import Profile from "../Components/home/Profile";
import { dummy } from "../Components/constants/dummy";
import moment from 'moment'
function Home() {
  return (
    <div className="grid" style={{ gridTemplateColumns: "22% 48% 30%" }}>
      {/* chat list */}
      <div className="flex  flex-col gap-2 overflow-y-scroll border-r-[1px] h-[91vh]">
        {dummy.map((data, idx) => (
          <ChatList key={idx} data={data} />
        ))}
      </div>

      {/* chat screen */}
      <div className="flex justify-center items-center">
        <ChatScreen  />
      </div>

      {/* profile */}
      <div className="flex justify-center items-center border-l-[1px] h-[92vh] bg-red-200">
        <Profile />
      </div>
    </div>
  );
}

export default Home;
