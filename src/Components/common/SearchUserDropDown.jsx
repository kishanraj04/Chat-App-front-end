import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useSelector } from "react-redux";
import api from "../../store/api/api";

function SearchUserDropDown({ avatar, name, onAdd }) {
  const { searchusername, clickedelement } = useSelector((state) => state.tmp);
  const selectSearchUser = api.endpoints.searchUser.select(searchusername);
  const { data = [], isLoading, isError } = useSelector(selectSearchUser);
  console.log(data);
  return (
    <>
      {data?.modifydata?.length==0 ? <div className="h-[5rem] flex justify-center items-center w-[10rem] font-bold">
        <h1>No User Found</h1>
      </div> :data?.modifydata?.map(({avatar,name},idx) => (
        <div key={idx} className="w-full px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center border-b">
          {/* Left: Avatar and Name */}
          <div className="flex items-center gap-3">
            <img
              src={avatar}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-medium text-gray-800">{name}</span>
          </div>

          {/* Right: + Icon */}
          <div onClick={onAdd}>
            <CiCirclePlus
              size="1.8rem"
              className="text-blue-500 hover:scale-110 transition-transform"
            />
          </div>
        </div>
      ))}
    </>
  );
}

export default SearchUserDropDown;
