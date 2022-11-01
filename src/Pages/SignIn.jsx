import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import "../Assets/index.css"
import logo from '../Assets/png/logo.png';
import visibilityIcon from '../Assets/svg/visibilityIcon.svg';
import {ReactComponent as ArrowRightIcon} from '../Assets/svg/keyboardArrowRightIcon.svg';

function SignIn() {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const {email, password} = formData
  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState, 
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = async(e) => {
    e.preventDefault()

    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      if(userCredential.user) {
        navigate('/profile')
      }
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-password') {
        toast.error('Password must be at least 6 characters')
      }
      else if (errorCode === 'auth/user-not-found') {
        toast.error('Either your email or password does not match our records')
      }
      else if (errorCode === 'auth/wrong-password') {
        toast.error('Please check your password and try again')
      }
      else {
        toast.error('Oops, something went wrong')
      }
      
    }
  }

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
      <div className="flexAlignCenter">
        <h2>Welcome Back!</h2>
        </div>
        <form onSubmit={onSubmit}>
          <input type="email" className="emailInput" placeholder="Email" id="email" value={email} onChange={onChange}/>
          <div className="passwordInputDiv">
            <input type={showPassword ? 'text' : 'password'} className='passwordInput' placeholder="Password" id="password" value={password} onChange={onChange}/>
            <img src={visibilityIcon} alt="show password" className="showPassword" onClick={() => setShowPassword((prevState) => !prevState)}/>
        </div>
        <div className='forgotPasswordBlock'>
        <Link to='/forgot-password' className='forgotPasswordLink'>Forgot Password</Link>
        </div>
        <div className="flexAlignCenter">
          <p className="signInText">Sign In</p>
          <button className="signInButton">
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px'/>
          </button>
        </div>
        </form>

        {/* Google OAuth component */}
        <div className="flexAlignCenter">
          <Link to='/sign-up' className="registerLink">No account? Sign up instead</Link>
        </div>
      </div>
    </div>
</>
  )
}

export default SignIn