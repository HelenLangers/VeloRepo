import React, {useEffect, useState, useRef} from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

// This is a custom hook to check whether a user is logged in and return true or false for both these states. This is then used in the PrivateRoute

export const useAuthStatus = () => {

    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)
    const isMounted = useRef(true)

    useEffect(() => {
        if(isMounted){
            const auth = getAuth()
            onAuthStateChanged(auth, (user) => {
                if(user){
                    setLoggedIn(true)
                }
                setCheckingStatus(false)
            })
        }
        return () => {
            isMounted.current = false
        }
    }, [isMounted])

    return { loggedIn, checkingStatus}
}
