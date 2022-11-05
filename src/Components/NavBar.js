import React from 'react'
import '../Assets/navBar.css';
import {Outlet, Link} from 'react-router-dom';
import { FaRegPlusSquare } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { BiInfoCircle } from 'react-icons/bi';
import { FaLightbulb} from 'react-icons/fa';
import Darkmode from 'darkmode-js'

function NavBar() {



  const options = {
    bottom: '700px', // default: '32px'
    right: 'unset', // default: '32px'
    left: '32px', // default: 'unset'
    time: '0.5s', // default: '0.3s'
    mixColor: '#fff', // default: '#fff'
    backgroundColor: '#fff',  // default: '#fff'
    buttonColorDark: '#100f2c',  // default: '#100f2c'
    buttonColorLight: '#fff', // default: '#fff'
    saveInCookies: true, // default: true,
    label: '🌓', // default: ''
    autoMatchOsTheme: true // default: true
  }
  

  
  const darkmode = new Darkmode(options);
  

  return (
    <>
      <div>
        <Outlet 
        />
      </div>
      <nav className='navbar'>

        <div className="navOptionBlock">
          <button  onClick={
            () => {darkmode.toggle()}
          } ><FaLightbulb className='navIcon'/></button>
        </div>
        
        <div className="navOptionBlock">
          <Link to='/welcome'><FaHome className='navIcon'/></Link>
        </div>
        <div className="navOptionBlock">
          <Link to='/create-item'><FaRegPlusSquare className='navIcon' /></Link>
        </div>
        <div className="navOptionBlock">
          <Link to='/browser'><FaSearch className='navIcon' /></Link>
        </div>
        <div className="navOptionBlock">
          <Link to='/profile'><FaRegUser className='navIcon'/></Link>
        </div>
        <div className="navOptionBlock">
          <Link to='/information'><BiInfoCircle className='navIcon' /></Link>
        </div>
        
      </nav>
    </>
  )
}

export default NavBar