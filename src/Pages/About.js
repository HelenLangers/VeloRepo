import React from "react";
import '../Assets/index.css';
import {Link} from 'react-router-dom'
import whitelogo from '../Assets/png/white-logo-small.png';
import {useAuthStatus} from '../Hooks/useAuthStatus';
import Spinner from "../Components/Spinner";
import instructions from '../Assets/png/fullinstructions.png';

function About() {


  const { loggedIn, checkingStatus} = useAuthStatus()

  if(checkingStatus) {
    return <Spinner/>
  }

  return (
    <div className="imageBackground">
        <header className="landingPageHeader">
            <a href="/">
            <img src={whitelogo} alt="VeloRepo" className="logo" />
            </a>
        <div className="navLinks">
            {loggedIn ? (
            <>
            <Link className="landingPageLinks" to="/welcome">
                Home
            </Link>
            <Link className="landingPageLinks" to="/profile">
                Profile
            </Link>
            </>
        ) : (
            <>
            <Link className="landingPageLinks" to="/sign-up">
                Sign up
            </Link>

            <Link className="landingPageLinks" to="/sign-in">
                Log in
            </Link>
            </>
        )}
        </div>
        </header>

        <div className="aboutContainer">
        <div className="aboutBlock">
                <h2>What is VeloRepo?</h2>
                <div className="flexAlignCenterColumn">
                    <p>VeloRepo is a platform for peer-to-peer kit sharing within cycling communities.</p>
                </div>
            </div>

            <div className="aboutBlock">
                <h2>How does it work?</h2>
                <div className="flexAlignCenterColumn">
                <img src={instructions} alt="sign up and borrow" className="instructionImages"/>
                </div>
            </div>
        </div>

    </div>
);
}

export default About;
