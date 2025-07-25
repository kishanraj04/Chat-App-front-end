import React, { useContext, useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { CiCirclePlus, CiSearch } from "react-icons/ci";
import { IoIosContacts, IoMdLogOut } from "react-icons/io";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { customMenuHandler } from "../Utils/CustomMenuHandler";
import CustomContextMenu from "../Components/common/ContextMenu";
import { GlobalContext } from "../context/GlobalContext";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetUser } from "../store/reducers/authSlice";
import { useGetFirendRequestMutation, useLazySearchUserQuery, useSendFrRequestMutation } from "../store/api/api";
import {
  setClickedElement,
  setSearchUserName,
} from "../store/reducers/tmpvariable";

const ChatHeader = () => {
  const { axis, setAxis } = useContext(GlobalContext);
  const userref = useRef();
  const { avatar,_id} = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [triggerSearch, { isError, isLoading, data }] =
    useLazySearchUserQuery();
 
  const baseUrl = "http://localhost:3000/api/v1";

  return (
    <>
      <header
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white grid min-h-[3.5rem] relative"
        style={{ gridTemplateColumns: "10% 70% 20%" }}
      >
        <div className="flex justify-center items-center">HeyChat</div>

        <div className="flex justify-end items-center">
          <input
            type="text"
            name="user"
            id=""
            ref={userref}
            placeholder="Search User"
            className="border-[1px] h-[50%] w-[10rem] rounded-2xl outline-0"
          />
          <div className="grid grid-cols-6 gap-4 justify-end items-center w-[35%]">
            <CiSearch
              size={"2rem"}
              id="search"
              onClick={async (e) => {
                dispatch(setClickedElement(e.currentTarget.id));

                if (userref?.current?.value === "") {
                  toast.error("please enter the name");
                  return;
                }

                dispatch(setSearchUserName(userref?.current?.value));
                const response = await triggerSearch(
                  userref?.current?.value
                ).unwrap();

                customMenuHandler(e, setAxis, true);
              }}
            />

            <CiCirclePlus
              size={"2rem"}
              id="creategroup"
              onClick={(e) => {
                dispatch(setClickedElement(e.currentTarget.id));
                customMenuHandler(e, setAxis);
              }}
            />

            <IoIosContacts
              size={"2rem"}
              id="friend"
              onClick={(e) => {
                dispatch(setClickedElement(e.currentTarget.id));
                customMenuHandler(e, setAxis);
                navigate("/home/Groups")
              }}
            />

            <IoNotificationsCircleOutline
              size={"2rem"}
              id="notification"
              onClick={(e) => {
                dispatch(setClickedElement(e.currentTarget.id));
                
                customMenuHandler(e, setAxis);
              }}
            />

            <IoMdLogOut
              size={"2rem"}
              id="logout"
              onClick={async () => {
                try {
                  const logoutresp = await axios.get(`${baseUrl}/user/logout`, {
                    withCredentials: true,
                  });

                  if (logoutresp?.data?.success) {
                    toast.error("user logout");
                    dispatch(resetUser());
                    navigate("/");
                  }
                } catch (error) {
                  console.log(error?.message);
                }
              }}
            />
          </div>
        </div>

        <div className="flex justify-around items-center pr-4">
          <div className="rounded-full border w-[3rem] h-[3rem] overflow-hidden flex justify-center items-center">
            <img
              src={avatar}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {(axis.xaxis || axis.yaxis) != 0 && axis.flag ? (
        <div
          className="absolute"
          style={{
            top: `${axis.yaxis}px`,
            left: `${axis.xaxis}px`,
          }}
        >
          <CustomContextMenu />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ChatHeader;
