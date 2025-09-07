import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import TCSLogo from './TCSLogo'
const Layout = () => {
  return (
    <div>
        <Navbar/>
        <main>
            <Outlet/>
        </main>
        <TCSLogo/>
    </div>
  )
}

export default Layout