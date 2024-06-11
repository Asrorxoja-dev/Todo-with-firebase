import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Mainlayout() {
  return (
    <div className="mx-10">
    <Navbar/>
       <main>
       <Outlet/>
       </main>
    </div>
  )
}

export default Mainlayout