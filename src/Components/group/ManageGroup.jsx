import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetGroupDataQuery,
  useRemoveMemberMutation,
} from "../../store/api/api";
import { toast } from "react-toastify";
import { getSocket } from "../../context/SocketProvider";
import { setIsAddInGroup } from "../../store/reducers/tmpvariable";
import ShowAvailableFriend from "./ShowAvailableFriends";

function ManageGroup() {
  const dispatch = useDispatch();
  const { clickedGroup, isAddInGroup } = useSelector((state) => state.tmp);
  const { _id: authId } = useSelector((state) => state.auth);

  const {
    data: groupData,
    isLoading,
    refetch,
  } = useGetGroupDataQuery(clickedGroup, {
    skip: !clickedGroup,
  });

  const [removeMember] = useRemoveMemberMutation();
  const socket = getSocket();
  const group = groupData?.data;

  useEffect(() => {
  if (!socket) return;

  const deleteMemberAlert = async ({ updatedGroup, removedUser }) => {
    if (removedUser?.name) {
      toast.info(`${removedUser.name} has been removed from the group`);
    }

    // ✅ Wait for refetch to complete
    await refetch();
  };

  socket.on("DELETE_MEMBER", deleteMemberAlert);
  return () => socket.off("DELETE_MEMBER", deleteMemberAlert);
}, [socket, refetch]);


  const handleRemoveMember = async (e, memberId) => {
    e.stopPropagation();
    if (authId !== group?.creator) {
      toast.error("You are not authorized to remove members.");
      return;
    }

    if (group?.members?.length <= 3) {
      toast.error("Group must have at least 3 members.");
      return;
    }

    try {
      const res = await removeMember({
        chatId: clickedGroup,
        userId: memberId,
      }).unwrap();

      if (res.success) {
        toast.success("Member removed successfully.");
      } else {
        toast.error(res.message || "Failed to remove member.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error);
    }
  };

  const handleAddToggle = (e) => {
    e.stopPropagation();
    if (authId !== group?.creator) {
      toast.error("You are not authorized to add members.");
      return;
    }
    dispatch(setIsAddInGroup(true));
  };

  const handleBackgroundClick = () => {
    dispatch(setIsAddInGroup(false));
  };

  if (!clickedGroup || !group) {
    return (
      <div className="text-white text-center mt-8">
        No group selected or data not available.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-white text-center mt-8">Loading group data...</div>
    );
  }

  return (
    <div
      className="p-6 bg-gray-800 text-white shadow-lg w-full mx-auto h-[100vh]"
      onClick={handleBackgroundClick}
    >
      {isAddInGroup ? (
        <ShowAvailableFriend />
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">
            {group?.groupname || "Unnamed Group"}
          </h2>
          <p className="mb-6">Total Members: {group?.members?.length || 0}</p>

          <div className="space-y-4">
            {group?.members?.map((member) =>
              authId !== member?._id ? (
                <div
                  key={member?._id}
                  className="flex items-center justify-between bg-gray-700 p-4 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={member?.avatar || "/default-avatar.png"}
                      alt={member?.name}
                      className="h-12 w-12 rounded-full object-cover border-2 border-white"
                    />
                    <div>
                      <p className="font-semibold">{member?.name}</p>
                      <p className="text-sm text-gray-300">{member?.bio}</p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleRemoveMember(e, member?._id)}
                    className="px-4 py-1 bg-red-500 hover:bg-red-600 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              ) : null
            )}
          </div>

          <div className="w-full p-9 flex justify-around mt-6">
            <button className="border px-4 py-2 bg-red-500 rounded shadow">
              Delete Group
            </button>
            <button
              className="border px-4 py-2 bg-blue-600 rounded shadow"
              onClick={handleAddToggle}
            >
              Add Member
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ManageGroup;
