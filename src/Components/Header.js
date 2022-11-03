import React from 'react'
import '../Assets/index.css';
import {Link, useLocation} from 'react-router-dom'
import whitelogo from '../Assets/png/white-logo.png';
import blacklogo from '../Assets/png/black-logo.png';
import {useAuthStatus} from '../Hooks/useAuthStatus';
import Spinner from './Spinner';

function Header() {
  const location = useLocation()
  const {loggedIn, checkingStatus} = useAuthStatus()

  if(checkingStatus) {
    return <Spinner/>
  }

  return (
    <header className='landingPageHeader'>
      {location.pathname !== '/' || '/sign-in' || '/sign-up' || '/forgot-password' ? <img src={blacklogo} alt="VeloRepo" className="logo"/> : <img src={whitelogo} alt="VeloRepo" className="logo"/>}
      
      <div className="navLinks">
        <Link className='landingPageLinks' to="/sign-up">Sign up</Link>
        <Link className='landingPageLinks' to="/sign-in">Log in</Link>
      </div>
    </header>
  )
}

export default Header