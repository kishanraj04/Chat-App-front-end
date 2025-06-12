import React from "react";

function ChatList({ data }) {
  return (
    <div className="flex items-center shadow-[0_4px_10px_rgba(200,10,46,0.5)] h-[6rem] w-full px-4 gap-4">
      {/* Profile Image */}
      <div className="h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
        <img
          src={data?.url}
          alt={data?.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Name */}
      <div className="flex-1">
        <p className="text-lg font-medium">{data?.name}</p>
      </div>
    </div>
  );
}

export default ChatList;
