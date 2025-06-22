import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Profile() {
  const { avatar, user, bio, joindate } = useSelector((state) => state?.auth);
  const { fileSendByMe } = useSelector((state) => state.tmp);

  // Flatten file URLs
  const files = fileSendByMe
    ?.map((data) => data?.attachments?.map(({ url }) => url))
    .flat()
    .filter(Boolean); 

  return (
    <div className="flex flex-col items-center gap-10 font-serif font-semibold w-full  md:px-10">
      {/* Profile Image and Info */}
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="h-40 w-40 rounded-full overflow-hidden border shadow-md">
          <Link to={avatar} target="_blank">
          <img src={avatar} alt="avatar" className="h-full w-full object-cover" />
          </Link>
        </div>
        <p className="text-xl">{user || "Unknown"}</p>
        <p className="text-gray-600">{bio}</p>
      </div>

      {/* Sent Files Gallery */}
      <div className="w-full max-w-3xl">
        <p className="text-lg mb-2">Sent Files</p>
        <div
          className="h-40 overflow-y-scroll grid grid-cols-3 gap-2 p-1 rounded shadow-inner"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>
            {`div::-webkit-scrollbar { display: none; }`}
          </style>

          {files?.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">No Files Sent</div>
          ) : (
            files.map((url) => (
              <div key={url} className="w-full">
                <Link to={url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={url}
                    alt="attachment"
                    className="h-30 w-full object-cover "
                  />
                </Link>
              </div>
            ))
          )}
        </div>
      </div>

      {/* User Details Section */}
      <div className="w-full max-w-3xl">
        <p className="text-xl mb-4">Information</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
          <p>
            <span className="font-medium">Address:</span>{" "}
            <span className="text-gray-500">N/A</span>
          </p>
          <p>
            <span className="font-medium">Email:</span>{" "}
            <span className="text-gray-500">N/A</span>
          </p>
          <p>
            <span className="font-medium">Phone:</span>{" "}
            <span className="text-gray-500">N/A</span>
          </p>
          <p>
            <span className="font-medium">Join Date:</span>{" "}
            <span className="text-gray-500">{joindate || "N/A"}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
