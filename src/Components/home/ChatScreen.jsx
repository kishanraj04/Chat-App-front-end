import React, { useEffect, useRef, useState } from "react";
import { Paperclip, Send } from "lucide-react";
import { getSocket } from "../../context/SocketProvider";
import { useSelector } from "react-redux";
import { useGetChatMessagesQuery } from "../../store/api/api";

function ChatScreen() {
  const fileInputRef = useRef(null);
  const messageEndRef = useRef(null);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const socket = getSocket();

  const { chatId, members } = useSelector((state) => state.tmp);
  const { _id } = useSelector((state) => state.auth);

  const {
    data: userchats,
    refetch,
    isFetching,
  } = useGetChatMessagesQuery({ chatId, page }, { skip: !chatId });

  // Load new page when 'page' changes
  useEffect(() => {
    if (!chatId) return;
    const fetchMore = async () => {
      setIsFetchingMore(true);
      const res = await refetch();
      const newMessages = res?.data?.message || [];
      if (newMessages.length > 0) {
        setMessages((prev) => [...newMessages, ...prev]);
      }
      setIsFetchingMore(false);
    };
    fetchMore();
  }, [page, chatId, refetch]);

  useEffect(()=>{
   setPage(1);
  },[chatId])
  // Handle socket new message
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (data) => {
      const msg = data?.message;
      if (msg?.chat === chatId) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("NEW_MESSAGE", handleNewMessage);
    return () => socket.off("NEW_MESSAGE", handleNewMessage);
  }, [socket, chatId]);

  const sendMessage = () => {
    if (!msg.trim()) return;

    const allMembers = [...members, _id];
    socket.emit("NEW_MESSAGE", {
      chatId,
      members: allMembers,
      message: msg,
    });

    setMsg("");
  };

  const handleAttachmentClick = () => {
    fileInputRef.current.click();
  };

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    if (scrollTop < 15 && !isFetchingMore && userchats?.totalPage > page) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col justify-between h-[92vh] w-full bg-[#f0f3f8]">
      {/* Message Area */}
      <div className="overflow-y-scroll" onScroll={handleScroll}>
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
          <div ref={messageEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="flex items-center gap-3 p-3 bg-white border-t">
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Write Something..."
          className="flex-1 p-2 rounded-full border outline-none text-sm"
        />

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => console.log("Selected file:", e.target.files[0])}
        />

        <button
          onClick={handleAttachmentClick}
          className="text-gray-500 hover:text-blue-500"
        >
          <Paperclip size={20} />
        </button>

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
