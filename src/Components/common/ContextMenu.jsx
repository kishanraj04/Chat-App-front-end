import { useSelector } from "react-redux";
import ChooseFile from "./FileChoose";
import NotificationDropDown from "./NotificationDropDown";
import SearchUserDropDown from "./SearchUserDropDown";
import GroupDropDown from "./groupDropDown";

function CustomContextMenu() {
  const { searchusername, clickedelement } = useSelector((state) => state.tmp);
  console.log(clickedelement);
  return (
    <div className="h-[15rem] w-[15rem] overflow-auto">
      {clickedelement === "search"
        ? <SearchUserDropDown/>
        
        :clickedelement=="creategroup"
        ? <GroupDropDown/>
        :clickedelement=="notification"
        ?<NotificationDropDown/>
        :clickedelement=="file"
        ?<ChooseFile/>
        : ""}
    </div>
  );
}

export default CustomContextMenu;
