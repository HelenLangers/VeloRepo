import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import "../Assets/index.css"
import logo from '../Assets/png/logo.png';
import visibilityIcon from '../Assets/svg/visibilityIcon.svg';
import {ReactComponent as ArrowRightIcon} from '../Assets/svg/keyboardArrowRightIcon.svg';

function SignUp() {

  const [showPassword, setShowPassword] = useState(false);

  return (    
  <>
    <header className='landingPageHeader'>
      <img src={logo} alt="VeloRepo" className="logo"/>
      <div className="navLinks">
        <Link className='landingPageLinks' to="/sign-up">Sign up</Link>
        
        <Link className='landingPageLinks' to="/sign-in">Log in</Link>
      </div>
    </header>

    <div className="signInBlock">
      <div className="signInBox">
        <h2>Welcome to VeloRepo</h2>
        <h3>Please enter your details to sign up</h3>
        <form>
          <input type="email" className="emailInput" placeholder="Email"/>
          <div className="passwordInputDiv">
            <input type={showPassword ? 'text' : 'password'} className='passwordInput' placeholder="Password" id="password"/>
            <img src={visibilityIcon} alt="show password" className="showPassword" onClick={() => setShowPassword((prevState) => !prevState)}/>
        </div>
        
        <div className="signInBar">
          <p className="signInText">Sign In</p>
            <button className="signInButton">
            <ArrowRightIcon fill='#ffffff' width='34px' height='34px'/>
           </button>
        </div>
        </form>
      </div>
    </div>
</>
  )
}
export default SignUp