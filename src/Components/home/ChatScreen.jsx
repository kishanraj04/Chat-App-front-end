import React, { useContext, useEffect, useRef, useState } from "react";
import { Paperclip, Send } from "lucide-react";
import { getSocket } from "../../context/SocketProvider";
import { useDispatch, useSelector } from "react-redux";
import { useGetChatMessagesQuery } from "../../store/api/api";
import { GlobalContext } from "../../context/GlobalContext";
import {
  setClickedElement,
  setSendFileByMe,
} from "../../store/reducers/tmpvariable";
import ChooseFile from "../common/FileChoose";
import { toast } from "react-toastify";
import TypingLoader from "../loader/TypingLoader";

function ChatScreen() {
  const fileInputRef = useRef(null);
  const messageEndRef = useRef(null);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [toggleChooseFile, setToggleChooseFile] = useState(false);
  const { setAxis } = useContext(GlobalContext);
  const socket = getSocket();

  const [typing, setTyping] = useState(true);
  const [imTyping, setImTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typedChat, setTypedChat] = useState("");
  const timeout = useRef(null);

  const { chatId, members, fileUploading } = useSelector((state) => state.tmp);
  const { _id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { data: userchats, refetch } = useGetChatMessagesQuery(
    { chatId, page },
    { skip: !chatId }
  );

  useEffect(() => {
    if (userchats) {
      dispatch(setSendFileByMe(userchats?.message));
    }
  }, [userchats]);

  useEffect(() => {
    setPage(1);
    setMessages([]);
  }, [chatId]);

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

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (data) => {
      const msg = data?.message;
      if (msg?.chat === chatId) {
        dispatch(setSendFileByMe([msg]));
        setMessages((prev) => [...prev, msg]);
      }
    };

    const startTypingHandler = (data) => {
      setTypedChat(data?.chatId);
      setIsTyping(true);
    };

    const handleStopTyping = () => {
      setTypedChat("");
      setIsTyping(false);
    };

    const handleDeleteUserAlert = ({ updatedGroup, removedUser, chatId: removedFrom }) => {
      if (removedUser?.name && removedFrom === chatId) {
        toast.info(`${removedUser.name} has been removed from the group`);

        // Add system message to chat
        const systemMsg = {
          _id: `sys-${Date.now()}`,
          content: `👋 ${removedUser.name} has been removed from the group.`,
          chat: removedFrom,
          system: true,
          createdAt: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, systemMsg]);
      }
    };

    const handleNewMemberAdded = async({chatId,name})=>{
      console.log(chatId , name);
         const systemMsg = {
          _id: `sys-${Date.now()}`,
          content: `👋 ${name} has been added to group.`,
          chat: chatId,
          system: true,
          createdAt: new Date().toISOString(),
        };
        console.log("added");
        setMessages((prev) => [...prev, systemMsg]);
    }

    socket.on("NEW_MESSAGE", handleNewMessage);
    socket.on("START_TYPING", startTypingHandler);
    socket.on("STOP_TYPING", handleStopTyping);
    socket.on("DELETE_MEMBER", handleDeleteUserAlert);
    socket.on("NEW_MEMBER_ADDED",handleNewMemberAdded)
    return () => {
      socket.off("NEW_MESSAGE", handleNewMessage);
      socket.off("START_TYPING", startTypingHandler);
      socket.off("STOP_TYPING", handleStopTyping);
      socket.off("DELETE_MEMBER", handleDeleteUserAlert);
       socket.off("DELETE_MEMBER", handleDeleteUserAlert);
    socket.off("NEW_MEMBER_ADDED",handleNewMemberAdded)
    };
  }, [socket, chatId]);

  console.log(messages);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = () => {
    if (!msg.trim()) return;

    const allMembers = [...members, _id];

    socket.emit("NEW_MESSAGE", {
      chatId,
      members: allMembers,
      message: msg,
      loginUser: _id,
    });

    setMsg("");
  };

  const handleAttachmentClick = () => {
    setToggleChooseFile(!toggleChooseFile);
  };

  const handleScroll = (e) => {
    if (
      e.target.scrollTop < 15 &&
      !isFetchingMore &&
      userchats?.totalPage > page
    ) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col justify-between h-[92vh] w-full bg-gray-300">
      {/* Message Area */}
      <div
        className="overflow-y-scroll flex-1"
        onScroll={handleScroll}
        onClick={() => dispatch(setClickedElement(""))}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="p-3 flex flex-col gap-1">
          {messages.map(({ content, sender, chat, attachments, system }, index) =>
            chat === chatId ? (
              <div
                key={index}
                className={`flex flex-col w-fit ${
                  system
                    ? "self-center items-center"
                    : _id === sender?._id
                    ? "self-end items-end"
                    : "self-start items-start"
                }`}
              >
                {system ? (
                  <p className="text-xs text-gray-500 italic">{content}</p>
                ) : (
                  <>
                    {content && (
                      <p
                        className={`font-serif px-3 py-1 rounded-md ${
                          _id === sender?._id
                            ? "bg-cyan-800 text-white"
                            : "bg-gray-700 text-white"
                        }`}
                      >
                        {content}
                      </p>
                    )}
                    {attachments?.length > 0 &&
                      attachments.map(({ url }, i) => (
                        <a
                          key={i}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1"
                        >
                          <img
                            src={url}
                            alt={`attachment-${i}`}
                            className="max-w-xs rounded-md hover:opacity-90 transition"
                          />
                        </a>
                      ))}
                  </>
                )}
              </div>
            ) : null
          )}

          <div ref={messageEndRef} />
          <div className="w-full flex justify-center">
            {isTyping && chatId === typedChat && <TypingLoader />}
          </div>
        </div>
      </div>

      {toggleChooseFile && (
        <div className="flex self-end bg-transparent">
          <ChooseFile />
        </div>
      )}

      {/* Input Area */}
      <div className="flex items-center gap-3 p-3 bg-transparent">
        <input
          type="text"
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
            if (typing) {
              socket.emit("START_TYPING", {
                chatId,
                members: [...members],
              });
              setTyping(false);
            }

            if (timeout?.current) clearTimeout(timeout?.current);

            timeout.current = setTimeout(() => {
              socket.emit("STOP_TYPING", {
                chatId,
                members: [...members],
              });
              setTyping(true);
            }, 500);
          }}
          placeholder="Write something..."
          className="flex-1 p-2 rounded-full border outline-none text-sm"
        />

        {fileUploading ? (
          "sending.."
        ) : (
          <button
            onClick={handleAttachmentClick}
            className="text-gray-500 hover:text-blue-500"
          >
            <Paperclip size={20} />
          </button>
        )}

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
