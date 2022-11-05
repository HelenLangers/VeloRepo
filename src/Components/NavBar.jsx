import React from 'react'
import '../Assets/navBar.css';
import {Outlet, Link} from 'react-router-dom';
import { FaRegPlusSquare } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { BiInfoCircle } from 'react-icons/bi';
import colorinitial from '../Assets/png/colour-logo-initial.png'

function NavBar() {


  return (
    <>
      <div>
        <Outlet />
      </div>
      <nav className='navbar'>
      <div className="logoBlock">
          <Link to='/'><img src={colorinitial} alt="logo" className='initialLogo'/></Link>
        </div>
        <div className="navOptionBlock">
          <Link to='/welcome' className='navOptionBlock'><FaHome className='navIcon'/><p className='navText'>Home</p></Link>
          
        </div>
        <div className="navOptionBlock">
          <Link to='/create-item' className='navOptionBlock'><FaRegPlusSquare className='navIcon' /><p className='navText'>Add Kit</p></Link>
          
        </div>
        <div className="navOptionBlock">
          <Link to='/browser' className='navOptionBlock'><FaSearch className='navIcon' /><p className='navText'>Browse Kit</p></Link>
          
        </div>
        <div className="navOptionBlock">
          <Link to='/profile' className='navOptionBlock'><FaRegUser className='navIcon'/><p className='navText'>Your Profile</p></Link>
          
        </div>
        <div className="navOptionBlock">
          <Link to='/information' className='navOptionBlock'><BiInfoCircle className='navIcon' /><p className='navText'>Info</p></Link>
          
        </div>
      </nav>
    </>
  )
}

export default NavBar