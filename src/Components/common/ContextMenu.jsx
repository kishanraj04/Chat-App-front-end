import React from "react";
import api, { useLazySearchUserQuery } from "../../store/api/api";
import { data } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchUserDropDown from "./SearchUserDropDown";

function CustomContextMenu() {
  const { searchusername, clickedelement } = useSelector((state) => state.tmp);
 
  return (
    <div className="h-[15rem] w-[15rem] overflow-auto">
      {clickedelement === "search"
        ? <SearchUserDropDown/>
        : clickedelement === "friend"
        ? "friend"
        :clickedelement=="friendreq"
        ? "friendreq"
        :clickedelement=="notification"
        ?"notification"
        : "nothing"}
    </div>
  );
}

export default CustomContextMenu;
