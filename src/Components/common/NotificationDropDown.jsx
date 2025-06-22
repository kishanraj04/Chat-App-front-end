import { useSelector } from "react-redux";
import { useGetFirendRequestMutation, useGetYourRequestNotificationQuery } from "../../store/api/api";

function NotificationDropDown({ avatarUrl, onAccept, onReject }) {

  const {_id} = useSelector((state)=>state.auth)
  
  const {data:notification} = useGetYourRequestNotificationQuery()
   const [triggerGetFriendReq,friendReqRes] = useGetFirendRequestMutation()
  
  return (
   <>
   {
    notification?.data?.length==0?<div className="font-bold flex justify-center items-center">
      0 Notification
    </div>: notification?.data?.map(({sender,_id})=><div className="flex items-center justify-between p-1 bg-white rounded-xl shadow-md w-full max-w-md">
      {/* Avatar */}
      <div className="flex items-center space-x-2">
        <img
          src={sender?.avatar}
          alt="User Avatar"
          className="w-12 h-12 rounded-full border border-gray-300"
        />
      </div>

      {/* Accept Button */}
      <div className="mx-2">
        <button
          onClick={(e)=>{
            triggerGetFriendReq({requestId:_id,accept:e.target.value})  
          }}
          value={true}
          className="bg-green-500 text-white px-2 py-0 rounded-lg hover:bg-green-600 transition"
        >
          Accept
        </button>
      </div>

      {/* Reject Button */}
      <div>
        <button
          onClick={(e)=>{
            triggerGetFriendReq({requestId:_id,accept:e.target.value})
          }}
          value={false}
          className="bg-red-500 text-white  px-2 py-0 rounded-lg hover:bg-red-600 transition"
        >
          Reject
        </button>
      </div>
    </div>)
   }
   </>
  );
}

export default NotificationDropDown;
