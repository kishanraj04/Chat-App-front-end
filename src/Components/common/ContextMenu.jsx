import React from "react";
import api, { useLazySearchUserQuery } from "../../store/api/api";
import { data } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchUserDropDown from "./SearchUserDropDown";
import NotificationDropDown from "./NotificationDropDown";
import ChooseFile from "./FileChoose";

function CustomContextMenu() {
  const { searchusername, clickedelement } = useSelector((state) => state.tmp);
  console.log(clickedelement);
  return (
    <div className="h-[15rem] w-[15rem] overflow-auto">
      {clickedelement === "search"
        ? <SearchUserDropDown/>
        : clickedelement === "friend"
        ? "friend"
        :clickedelement=="friendreq"
        ? "friendreq"
        :clickedelement=="notification"
        ?<NotificationDropDown/>
        :clickedelement=="file"
        ?<ChooseFile/>
        : ""}
    </div>
  );
}

export default CustomContextMenu;
