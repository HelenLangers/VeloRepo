import {useLocation, useNavigate} from 'react-router-dom'
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import { doc, setDoc , getDoc} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import googleIcon from '../Assets/svg/googleIcon.svg'

function OAuth (){

    const navigate = useNavigate()
    const location = useLocation()
    
    const onGoogleClick = () => {}    

    return (
        <div className= 'socialLogin'>
            <p>Sign {Location.pathname === '/sign-up' ? 'up' : 'in'}
            with</p>
            <button className='socialIconDiv' onClick={onGoogleClick}>
                <img className='socialIconImage' src={googleIcon} alt="google" />
                </button>
        </div>
    )
}

export default OAuth