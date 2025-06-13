import React, { useEffect } from 'react'
import ChatHeader from './pages/Header'
import { Outlet, useNavigate } from 'react-router-dom'
import ChatFooter from './pages/Footer'
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { isUserExist } from './store/reducers/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useMyChatQuery } from './store/api/api'
function App() {

  const baseUrl = "http://localhost:3000/api/v1";
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {isloading} = useSelector((state) => state?.auth);
  
  useEffect(() => {
    if(isloading){
      navigate("/")
    }
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [isloading]);
  
  const {isloading:chatloding,isError,data} = useMyChatQuery()
  console.log(data);
  
  // direct login
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/user/direct-login`, {
          withCredentials: true,
        });
       
        dispatch(isUserExist(data));
      } catch (error) {}
    })();
  }, []);
  // const baseUrl = "http://localhost:3000/api/v1"
  // useEffect(()=>{
  //   console.log("hii");
  //       (async()=>{
  //         const user = await axios.get(`${baseUrl}/user/profile`)
  //         console.log(user);
  //       })()
  // },[])

  return (
    <div >
      <ChatHeader/>
      <Outlet/>
      
      {/* <ChatFooter/> */}
    </div>
  )
}

export default App