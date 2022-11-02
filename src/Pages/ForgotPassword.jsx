import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import {getAuth, sendPasswordResetEmail} from 'firebase/auth'
import {toast} from 'react-toastify'
import {ReactComponent as ArrowRightIcon} from '../Assets/svg/keyboardArrowRightIcon.svg';
import whitelogo from '../Assets/png/white-logo.png';


function ForgotPassword() {

  const [email, setEmail] = useState('')

  const onChange = (e) => setEmail(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success('A password reset email has been sent')
    } catch (error) {
      toast.error('Could not send reset email')
    }
  }

  return (
    <div className="imageBackground">
    <header className='landingPageHeader'>
    <a href="/"><img src={whitelogo} alt="VeloRepo" className="logo"/></a>
      <div className="navLinks">
        <Link className='landingPageLinks' to="/sign-up">Sign up</Link>
        
        <Link className='landingPageLinks' to="/sign-in">Log in</Link>
      </div>
    </header>
    <div className="signInBlock">
      <div className="signInBox">
      <div className='flexAlignCenterColumn'>
        <h2 className='textAlignCentre'>Have you forgotten your password?</h2>
        <p className='textAlignCentre'>Enter your registered email here:</p>
        </div>
        <form onSubmit={onSubmit}>
          <input type="email" className="emailInput" placeholder="Email" id="email" value={email} onChange={onChange}/>
  
        <div className="flexAlignCenter">
          <p className="signInText">Request Password</p>
          <button className="signInButton">
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px'/>
          </button>
        </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default ForgotPassword