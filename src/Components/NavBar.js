import React from 'react'
import '../Assets/navBar.css';
import {Outlet, Link} from 'react-router-dom';
import { FaRegPlusSquare } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { BiInfoCircle } from 'react-icons/bi';
import { FaLightbulb} from 'react-icons/fa';
import colorinitial from '../Assets/png/colour-logo-initial.png'
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
          <Link to='/browse' className='navOptionBlock'><FaSearch className='navIcon' /><p className='navText'>Browse Kit</p></Link>
          
        </div>
        <div className="navOptionBlock">
          <Link to='/profile' className='navOptionBlock'><FaRegUser className='navIcon'/><p className='navText'>Your Profile</p></Link>
          
        </div>
        <div className="navOptionBlock">
          <Link to='/information' className='navOptionBlock'><BiInfoCircle className='navIcon' /><p className='navText'>Info</p></Link>
        </div>
        <div className="navOptionBlock">
          <button className="navButton"  onClick={
            () => {darkmode.toggle()}
          } ><FaLightbulb className='navIcon'/></button>
        </div>
        
      </nav>
    </>
  )
}

export default NavBar