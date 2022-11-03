import React from 'react'
import '../Assets/index.css';
import {Link, useLocation} from 'react-router-dom'
import blacklogo from '../Assets/png/black-logo.png';

function BackEndHeader() {


  return (
    <header className='backEndHeader'>
      <img src={blacklogo} alt="VeloRepo" className="logo"/>
      <div className="navLinks">
        <Link className='landingPageLinks' to="/sign-up">Sign up</Link>
        <Link className='landingPageLinks' to="/sign-in">Log in</Link>
      </div>
    </header>
  )
}

export default BackEndHeader