import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { GrSubtractCircle } from "react-icons/gr";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import api, {
  useAllRequestQuery,
  useSendFrRequestMutation,
} from "../../store/api/api";

function SearchUserDropDown() {
  const { searchusername } = useSelector((state) => state.tmp);
  const { _id: loginUserId } = useSelector((state) => state.auth);

  // Fetch search result based on username
  const selectSearchUser = api.endpoints.searchUser.select(searchusername);
  const { data, isLoading, isError } = useSelector(selectSearchUser);

  // Mutation to send friend request
  const [sendFrReq] = useSendFrRequestMutation();

  // Get all friend requests
  const { data: allrequest } = useAllRequestQuery();

  // Loading state
  if (isLoading) {
    return (
      <div className="h-[5rem] flex justify-center items-center w-[10rem] font-bold">
        <h1>Loading...</h1>
      </div>
    );
  }

  // Error or missing data
  if (isError || !data || !data.modifydata) {
    return (
      <div className="h-[5rem] flex justify-center items-center w-[10rem] font-bold">
        <h1>Error or No Data</h1>
      </div>
    );
  }

  // No search results
  if (data.modifydata.length === 0) {
    return (
      <div className="h-[5rem] flex justify-center items-center w-[10rem] font-bold">
        <h1>No User Found</h1>
      </div>
    );
  }

  return (
    <>
      {data.modifydata.map(({ avatar, name, _id }, idx) => {
        // Check if the logged-in user has already sent a request to this user
        const alreadySent = allrequest?.data?.some(
          (req) =>
            (req?.sender?._id || req?.sender) === loginUserId &&
            (req?.receiver?._id || req?.receiver) === _id
        );

        return (
         <>
         {
          loginUserId!=_id? <div
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
                if (alreadySent) return;

                try {
                  const resp = await sendFrReq(_id);
                  if (resp?.data?.success) {
                    toast.success(`Request Sent to ${name}`);
                  } else {
                    toast.error(`Request Failed to ${name}`);
                  }
                } catch (error) {
                  toast.error("Something went wrong");
                }
              }}
              className="hover:scale-110 transition-transform"
            >
              {alreadySent ? (
                <GrSubtractCircle size="1.8rem" className="text-red-500" />
              ) : (
                <CiCirclePlus size="1.8rem" className="text-blue-500" />
              )}
            </div>
          </div>:""
         }
         </>
        );
      })}
    </>
  );
}

export default SearchUserDropDown;
