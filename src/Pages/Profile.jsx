import React, {useState, useEffect} from 'react'
import {getAuth} from 'firebase/auth';
import NavBar from '../Components/NavBar';
import '../Assets/loggedin.css';

function Profile() {

    const [user, setUser] = useState(null)

    const auth = getAuth()
    useEffect(() => {
        setUser(auth.currentUser)
    }, [])

  return (
    <>
        <div className="loggedInBackground">
        
        </div>
        <NavBar/>
    </>
  )
}

export default Profile