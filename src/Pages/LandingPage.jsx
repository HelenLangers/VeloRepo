import React from 'react'
import '../Assets/index.css';
import {Link} from 'react-router-dom'
import {useAuthStatus} from '../Hooks/useAuthStatus';
import Spinner from '../Components/Spinner';
import whitelogo from '../Assets/png/white-logo-small.png';



function LandingPage() {

  const { loggedIn, checkingStatus} = useAuthStatus()

  if(checkingStatus) {
    return <Spinner/>
  }

  return (
    <div className="imageBackground">
      <header className='landingPageHeader'>
        <a href="/"><img src={whitelogo} alt="VeloRepo" className="logo"/></a>
        <div className="navLinks">
        {loggedIn ? <><Link className='landingPageLinks' to="/welcome">Home</Link>
          <Link className='landingPageLinks' to="/profile">Profile</Link><Link className='landingPageLinks' to="/about">About</Link></> : <><Link className='landingPageLinks' to="/about">About</Link><Link className='landingPageLinks' to="/sign-up">Sign up</Link>
          
          <Link className='landingPageLinks' to="/sign-in">Log in</Link></>}
        </div>
      </header>

      <div className='tagLineBox'>
        <p className='tagLine'>Borrow.Adventure.Return.Repeat</p>
      </div>
      <p className='attributedText'>Photo by <a href="https://unsplash.com/@vaccinium?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Dmitrii Vaccinium</a> on <a href="https://unsplash.com/@vaccinium?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></p>
    </div>
  )
}

export default LandingPage