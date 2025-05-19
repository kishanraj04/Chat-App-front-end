import React from 'react'
import ChatHeader from './pages/Header'
import { Outlet } from 'react-router-dom'
import ChatFooter from './pages/Footer'

function App() {
  return (
    <div >
      <ChatHeader/>
      <Outlet/>
      {/* <ChatFooter/> */}
    </div>
  )
}

export default App