import React from 'react'
import '../Assets/index.css';
import {Link} from 'react-router-dom'
import {useAuthStatus} from '../Hooks/useAuthStatus';
import Spinner from '../Components/Spinner';
import whitelogo from '../Assets/png/white-logo.png';


function LandingPage() {

  const { loggedIn, checkingStatus} = useAuthStatus()

  if(checkingStatus) {
    return <Spinner/>
  }

  return (
    <div className="imageBackground">
      <header className='landingPageHeader'>
        <img src={whitelogo} alt="VeloRepo" className="logo"/>
        <div className="navLinks">
        {loggedIn ? <><Link className='landingPageLinks' to="/welcome">Home</Link>
          <Link className='landingPageLinks' to="/profile">Profile</Link></> : <><Link className='landingPageLinks' to="/sign-up">Sign up</Link>
          
          <Link className='landingPageLinks' to="/sign-in">Log in</Link></>}
        </div>
      </header>
      <div className='tagLineBox'>
        <p className='tagLine'>Borrow.Adventure.Return.Repeat</p>
      </div>
    </div>
  )
}

export default LandingPage