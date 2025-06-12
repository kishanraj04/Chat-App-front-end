import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const { avatar, user, bio,joindate} = useSelector((state) => state?.auth);
  return (
    <div className="flex flex-col gap-[5rem] font-semibold font-serif">
      {/* profile images */}
      <div className="flex flex-col justify-center items-center">
        <div className="h-[10rem] w-[10rem] rounded-full overflow-hidden border">
          <img
            src={avatar}
            alt="avatar"
            className="h-full w-full object-cover"
          />
        </div>

        <p>{user || "unkonwn"}</p>
        <p>Proffession</p>
      </div>

      {/* files */}
      <div>
        <button className="bg-blue-300 p-4 rounded-2xl hover:bg-blue-600 duration-700 ease-in-out text-white">
          Files Send By You
        </button>
      </div>
      {/* details */}
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-xl">Information</p>
        </div>
        <div>
          <p>
            <span>Address</span> <span>{}</span>
          </p>
          <p>
            <span>Email</span> <span>{}</span>
          </p>
          <p>
            <span>Phone</span> <span>{}</span>
          </p>
          <p>
            <span>Join Date :</span> <span>{joindate}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
