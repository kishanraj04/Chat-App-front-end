import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useSelector } from "react-redux";
import api, { useAllRequestQuery, useSendFrRequestMutation } from "../../store/api/api";
import { toast } from "react-toastify";
import { GrSubtractCircle } from "react-icons/gr";

function SearchUserDropDown() {
  const { searchusername } = useSelector((state) => state.tmp);

  // Get search user result
  const selectSearchUser = api.endpoints.searchUser.select(searchusername);
  const { data = [], isLoading, isError } = useSelector(selectSearchUser);

  // Friend request mutation
  const [sendFrReq] = useSendFrRequestMutation();

  // Get all sent friend requests
  let { data: allrequest } = useAllRequestQuery();
  const receiverIds = allrequest?.data?.map(({ 
receiver }) => receiver?._id || receiver) || [];

  return (
    <>
      {data?.modifydata?.length === 0 ? (
        <div className="h-[5rem] flex justify-center items-center w-[10rem] font-bold">
          <h1>No User Found</h1>
        </div>
      ) : (
        data.modifydata.map(({ avatar, name, _id }, idx) => {
          const alreadySent = receiverIds.includes(_id);

          return (
            <div
              key={idx}
              className="w-full px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center border-b"
            >
              {/* Left: Avatar and Name */}
              <div className="flex items-center gap-3">
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-medium text-gray-800">{name}</span>
              </div>

              {/* Right: Add/Minus Icon */}
              <div
                onClick={async () => {
                  if (alreadySent) return; // prevent re-sending if already sent
                  const resp = await sendFrReq(_id);
                  if (resp?.data?.success) {
                    toast.success(`Request Sent to ${name}`);
                  } else {
                    toast.error(`Request Failed to ${name}`);
                  }
                }}
              >
                {alreadySent ? (
                  <GrSubtractCircle
                    size="1.8rem"
                    className="text-red-500 hover:scale-110 transition-transform"
                  />
                ) : (
                  <CiCirclePlus
                    size="1.8rem"
                    className="text-blue-500 hover:scale-110 transition-transform"
                  />
                )}
              </div>
            </div>
          );
        })
      )}
    </>
  );
}

export default SearchUserDropDown;
