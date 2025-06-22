import React from "react";
import { useGetMyChatsQuery } from "../../store/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setChatId, setMembers, setSearchUserName } from "../../store/reducers/tmpvariable";

function ChatList({ data }) {

  const {data:chat} = useGetMyChatsQuery()
  const {chatId} = useSelector((state)=>state.tmp)
  const dispatch = useDispatch()
  return (
   <>
   
    {
      chat?.transformchats?.map(({avatar,name,_id,members})=><div className={`flex items-center h-[6rem] w-full px-4 gap-4 border-t-[1px] border-b[1px] text-white font-serif ${chatId==_id?"bg-blue-900":""}`} onClick={()=>{
        dispatch(setChatId(_id))
        dispatch(setMembers(members))
      }}  style={{
    scrollbarWidth: "none",      
    msOverflowStyle: "none",     
  }}>
      {/* Profile Image */}
      <div className="h-16 w-16 rounded-full overflow-hidden flex-shrink-0"   style={{
    scrollbarWidth: "none",      
    msOverflowStyle: "none",     
  }}>
        <img
          src={avatar[0]}
          alt={data?.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Name */}
      <div className="flex-1">
        <p className="text-lg font-medium">{name}</p>
      </div>
    </div>)
    }
   
   </>
  );
}

export default ChatList;
