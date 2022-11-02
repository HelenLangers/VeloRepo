import React from 'react'
import '../Assets/navBar.css';
import {useLocation} from 'react-router-dom';

function NavBar() {
  // const location = useLocation()

  // if(location.pathname === '/' || '/sign-in' || '/sign-up' || '/forgot-password') {
  //   return null
  // }

  return (
    <nav className='navbar'>
        <p>Navbar is going to be here!</p>
    </nav>
  )
}

export default NavBar