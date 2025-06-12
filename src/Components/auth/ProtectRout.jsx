import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isUserExist } from "../../store/reducers/authSlice";
import { isUserPresent } from "../../helper/isUserExist";
import { useNavigate } from "react-router-dom";

export const ProtectRoute = ({ children }) => {
  const baseUrl = "http://localhost:3000/api/v1";
  const dispatch = useDispatch();
  const {isloading} = useSelector((state) => state?.auth);
  
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  // direct login
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/user/direct-login`, {
          withCredentials: true,
        });
        console.log(data);
        dispatch(isUserExist(data));
      } catch (error) {}
    })();
  }, []);

  return children;
};
