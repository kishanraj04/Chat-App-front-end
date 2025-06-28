import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAddMemberToGroupMutation, useGetGroupDataQuery, useGetMyFriendsQuery } from "../../store/api/api";
import { setIsAddInGroup } from "../../store/reducers/tmpvariable";
import { FaUserPlus } from "react-icons/fa"; // Icon for add user

function ShowAvailableFriend() {
  const { chatId, isAddInGroup, clickedGroup } = useSelector(
    (state) => state?.tmp
  );
  const [addToGroupApi,addMemberResp] = useAddMemberToGroupMutation()

  const { _id } = useSelector((state) => state.auth);
  const { data: groupData } = useGetGroupDataQuery(clickedGroup, {
    skip: !clickedGroup,
  });
  const { data: myFriends, isLoading } = useGetMyFriendsQuery(chatId);
  const dispatch = useDispatch();

  const availableFriends = myFriends?.firends?.filter((friend) => {
    return !groupData?.data?.members?.some(
      (member) => member._id === friend._id
    );
  });

  const handleAddMember = async(friendId) => {
    try {
      const resp = addToGroupApi({chatId:clickedGroup,newMembers:[friendId]})
    } catch (error) {
      
    }
  };
  return (
    <div className="w-full h-full p-6 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Add Friends to Group</h2>

      {availableFriends?.length === 0 && (
        <p className="text-gray-600">No available friends to add.</p>
      )}

      <div className="grid gap-4">
        {availableFriends?.map((friend) => (
          <div
            key={friend._id}
            className="flex items-center justify-between  p-4 rounded-lg shadow"
          >
            <div className="flex items-center gap-4">
              <img
                src={friend.avatar}
                alt={friend.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold">{friend.name}</h3>
                <p className="text-sm text-gray-500">{friend.bio}</p>
              </div>
            </div>
            <button
              className="text-green-600 hover:text-green-800"
              onClick={(e) => {
                e.stopPropagation()
                handleAddMember(friend._id)
              }}
              title="Add to Group"
            >
              <FaUserPlus size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowAvailableFriend;
