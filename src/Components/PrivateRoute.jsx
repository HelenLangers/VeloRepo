import React from 'react'
import {Navigate, Outlet} from 'react-router-dom';
import {useAuthStatus} from '../Hooks/useAuthStatus';
import Spinner from './Spinner';


function PrivateRoute() {

    // deconstruct the custom hook after importing
    const { loggedIn, checkingStatus} = useAuthStatus()

    // if checkingStatus is true, return a spinner
    if(checkingStatus) {
        return <Spinner/>
    }
    
    return loggedIn ? <Outlet/> : <Navigate to='/sign-in'/>
}

export default PrivateRoute