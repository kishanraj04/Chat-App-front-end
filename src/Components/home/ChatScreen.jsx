import React, { useEffect, useRef, useState } from "react";
import { Paperclip, Send } from "lucide-react";
import { getSocket } from "../../context/SocketProvider";
import { useSelector } from "react-redux";
import { useGetChatMessagesQuery } from "../../store/api/api";

function ChatScreen() {
  const fileInputRef = useRef(null);
  const [msg,setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [page,setPage] = useState(1);
  const socket = getSocket();

  const { chatId, members } = useSelector((state) => state.tmp);
  const { _id } = useSelector((state) => state.auth);
  // 👂 Listen for new messages once on mount
  const {data:userchats} = useGetChatMessagesQuery({chatId,page})
  console.log(userchats?.message);
  // useEffect(())
  console.log(userchats);
  useEffect(() => {
    if (!socket) return;
    if(userchats?.message){
      setMessages((prev)=>[...userchats?.message,...prev])
    }
    const handleNewMessage = (data) => {
      setMessages((prev) => [...prev, data?.message]);
    };

    socket.on("NEW_MESSAGE", handleNewMessage);

    // 🧹 Cleanup on unmount
    return () => {
      socket.off("NEW_MESSAGE", handleNewMessage);
    };
  }, [socket,userchats?.message]);

  const sendMessage = () => {
    if (!msg?.trim()) return;
    
    const allMembers = [...members, _id];
    socket.emit("NEW_MESSAGE", {
      chatId,
      members: allMembers,
      message: msg,
    });

    // setMessage(""); // clear input
  };
  const handleAttachmentClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col justify-between h-[92vh] w-full bg-[#f0f3f8]">
      {/* Empty Chat Area */}
      <div className="overflow-y-scroll">
        {/* <p>hii</p> */}
        <div className="p-3 flex flex-col gap-1">
          {messages?.map(({ content, sender, chat }, index) =>
            chat === chatId ? (
              <p
                key={index}
                className={`font-serif px-3 py-1 rounded-md w-fit ${
                  _id === sender?._id
                    ? "self-end bg-cyan-800 text-white"
                    : "self-start bg-gray-700 text-white"
                }`}
              >
                {content}
              </p>
            ) : null
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="flex items-center gap-3 p-3 bg-white border-t">
        <input
          type="text"
          value={msg}
          onChange={(e)=>setMsg(e.target.value)}
          placeholder="Write Something..."
          className="flex-1 p-2 rounded-full border outline-none text-sm"
        />

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => console.log("Selected file:", e.target.files[0])}
        />

        {/* Attachment Button */}
        <button
          onClick={handleAttachmentClick}
          className="text-gray-500 hover:text-blue-500"
        >
          <Paperclip size={20} />
        </button>

        {/* Send Button */}
        <button
          onClick={sendMessage}
          className="bg-[#3e8ef7] p-2 rounded-full text-white hover:bg-blue-600"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}

export default ChatScreen;
