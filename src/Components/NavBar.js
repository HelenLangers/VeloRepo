import React from 'react'
import '../Assets/navBar.css';
import {Outlet, Link} from 'react-router-dom';
import { FaRegPlusSquare } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';

function NavBar() {


  return (
    <>
      <div>
        <Outlet />
      </div>
      <nav className='navbar'>
        <div className="navOptionBlock">
          <Link to='/welcome'><FaHome className='navIcon'/></Link>
        </div>
        <div className="navOptionBlock">
          <Link to='/create-item'><FaRegPlusSquare className='navIcon'/></Link>
        </div>
        <div className="navOptionBlock">
          <Link to='/'><FaSearch className='navIcon'/></Link>
        </div>
        <div className="navOptionBlock">
          <Link to='/profile'><FaRegUser className='navIcon'/></Link>
        </div>
      </nav>
    </>
  )
}

export default NavBar