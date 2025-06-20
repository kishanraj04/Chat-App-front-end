import React, { createContext, useContext, useMemo } from "react";
import io from "socket.io-client";

// Create context
export const SocketContext = createContext();

export const getSocket = ()=>useContext(SocketContext)

// Provider component
export const SocketProvider = ({ children }) => {
  const socket = useMemo(() => {
    return io("http://localhost:3000", {
      withCredentials: true,
    });
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

