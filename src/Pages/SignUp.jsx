import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {doc, setDoc, serverTimestamp} from 'firebase/firestore';
import {db} from '../firebase.config';
import "../Assets/index.css"
import logo from '../Assets/png/logo.png';
import visibilityIcon from '../Assets/svg/visibilityIcon.svg';
import {ReactComponent as ArrowRightIcon} from '../Assets/svg/keyboardArrowRightIcon.svg';
import { toast } from 'react-toastify';

function SignUp() {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const {name, email, password} = formData
  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState, 
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name
      })

      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
    } catch (error) {
      toast.error('Something went wrong with registration')
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
        <h2>Welcome to VeloRepo</h2>
        <h3>Please enter your details to sign up</h3>
        <form onSubmit={onSubmit}>
        <input type="text" className="nameInput" placeholder="Name" id="name" value={name} onChange={onChange}/>
        <input type="email" className="emailInput" placeholder="Email" id="email" value={email} onChange={onChange}/>
          <div className="passwordInputDiv">
            <input type={showPassword ? 'text' : 'password'} className='passwordInput' placeholder="Password" id="password" value={password} onChange={onChange}/>
            <img src={visibilityIcon} alt="show password" className="showPassword" onClick={() => setShowPassword((prevState) => !prevState)}/>
        </div>
        
        <div className="signInBar">
          <p className="signInText">Sign Up</p>
            <button className="signInButton">
            <ArrowRightIcon fill='#ffffff' width='34px' height='34px'/>
           </button>
        </div>
        </form>

                {/* Google OAuth component */}

                <Link to='/sign-in' className="registerLink">Sign In Instead</Link>
      </div>
    </div>
</>
  )
}
export default SignUp