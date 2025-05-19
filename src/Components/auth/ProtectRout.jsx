import { useEffect } from "react";

export const ProtectRoute = ({ children }) => {
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  console.log("runing");
  return children;
};
