// components/TypingLoader.jsx
import React from "react";

function TypingLoader() {
  return (
    <div className="flex items-center gap-2 p-2">
      <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
      <span className="text-xs text-gray-600 ml-2"></span>
    </div>
  );
}

export default TypingLoader;
