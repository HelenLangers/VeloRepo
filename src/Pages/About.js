import React from "react";
import "../Assets/About.css";
import { Link } from "react-router-dom";
import whitelogo from "../Assets/png/white-logo-small.png";
import { useAuthStatus } from "../Hooks/useAuthStatus";
import Spinner from "../Components/Spinner";
import instructions from "../Assets/png/fullinstructions.png";
import {AiOutlineCopyrightCircle} from 'react-icons/ai';

function About() {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Spinner />;
  }

  return (
    <div className="aboutPage">
      <header className="aboutPageHeader">
        <a href="/">
          <img src={whitelogo} alt="VeloRepo" className="logo" />
        </a>
        <div className="navLinks">
          {loggedIn ? (
            <>
              <Link className="landingPageLinks" to="/kit">
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

      <main className="aboutContainer">
        <div className="aboutBlock">
          <h2>What is VeloRepo?</h2>
          <div className="flexAlignCenterColumn">
            <p>There's no doubt that cycling is expensive and blindly encouraging more people to partake ignores a variety of barriers people face before they even get in the saddle.
            </p>
            <p>One of these barriers is access to kit. A set of bike bags can be upwards of £300 and a sleeping bag can be at least £150. If you want an entire setup, you're looking at £1,000+. But what if you buy a sleeping bag and decide it's not warm enough? It becomes an expensive cycle of trial and error whilst adding in the value deprecation on each thing you buy to eventually need to sell. A kit library might have range of each options allowing people to test them all out if they eventually want to buy their own.
            </p>
            <p>VeloRepo is a platform for peer-to-peer kit sharing within cycling communities. Start your kit sharing library here!
            </p>
            <p>If you're a community leader and want to create a community account on VeloRepo, please get in contact.</p>
          </div>
        </div>

        <div className="aboutBlock">
          <h2>How does it work?</h2>
          <div className="flexAlignCenterColumn">
            <img
              src={instructions}
              alt="sign up and borrow"
              className="instructionImages"
            />
          </div>
        </div>
        </main>

        <footer className="footer">
                <p><AiOutlineCopyrightCircle/> VeloRepo</p>
        </footer>

    </div>
  );
}

export default About;
