import React, { useState } from "react";
import { FiSend } from "react-icons/fi";

const ChatFooter = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <footer className="w-full bg-white shadow-inner p-4 flex items-center gap-2">
    
      <input
        type="text"
        placeholder="Type your message..."
        className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
      >
        <FiSend size={20} />
      </button>
    </footer>
  );
};

export default ChatFooter;
