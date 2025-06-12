import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { isUserExist } from "../../store/reducers/authSlice";

export const ProtectRoute = ({ children }) => {
  const baseUrl = "http://localhost:3000/api/v1"
  const dispatch = useDispatch()
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  // direct login
  useEffect(()=>{
    (async()=>{
      try {
        const {data} = await axios.get(`${baseUrl}/user/direct-login`,{withCredentials:true})
        dispatch(isUserExist(data))
      } catch (error) {
        console.log("err ",error.message);
      }
    })()
  },[])

  
  return children;
};
