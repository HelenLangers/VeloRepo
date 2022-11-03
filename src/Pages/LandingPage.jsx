import React from 'react'
import '../Assets/index.css';
import {Link} from 'react-router-dom'
import whitelogo from '../Assets/png/white-logo.png';



function LandingPage() {
  return (
    <div className="imageBackground">
      <header className='landingPageHeader'>
        <img src={whitelogo} alt="VeloRepo" className="logo"/>
        <div className="navLinks">
          <Link className='landingPageLinks' to="/sign-up">Sign up</Link>
          
          <Link className='landingPageLinks' to="/sign-in">Log in</Link>
        </div>
      </header>
      <div className='tagLineBox'>
        <p className='tagLine'>Borrow.Adventure.Return.Repeat</p>
      </div>
    </div>
  )
}

export default LandingPage