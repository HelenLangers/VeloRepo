import React from 'react'
import '../Assets/index.css';
import {Link} from 'react-router-dom'
import logo from '../Assets/png/logo.png';

function Header() {
  return (
    <header className='landingPageHeader'>
      <img src={logo} alt="VeloRepo" className="logo"/>
      <div className="navLinks">
        <Link className='landingPageLinks' to="/sign-up">Sign up</Link>
        
        <Link className='landingPageLinks' to="/sign-in">Log in</Link>
      </div>
    </header>
  )
}

export default Header