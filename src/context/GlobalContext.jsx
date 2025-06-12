import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [axis, setAxis] = useState({
    xaxis: 0,
    yaxis: 0,
    flag:false
  });

  return (
    <GlobalContext.Provider value={{ axis, setAxis }}>
      {children}
    </GlobalContext.Provider>
  );
};
