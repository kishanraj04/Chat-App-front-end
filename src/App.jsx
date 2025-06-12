import React, { useEffect } from 'react'
import ChatHeader from './pages/Header'
import { Outlet } from 'react-router-dom'
import ChatFooter from './pages/Footer'
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
function App() {

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