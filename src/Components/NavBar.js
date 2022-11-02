import React from 'react'
import '../Assets/navBar.css';
import {Outlet} from 'react-router-dom';
import { FaBeer } from 'react-icons/fa';

function NavBar() {


  return (
    <>
      <div>
        <Outlet />
      </div>
      <nav className='navbar'>
          <p>Navbar is going to be here!</p>
      </nav>

    </>
  )
}

export default NavBar