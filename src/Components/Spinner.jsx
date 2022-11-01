import React from 'react'
import '../Assets/spinner.css';

function Spinner() {
    return (
    <div className='loadingSpinnerContainer'>
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/26344/bike_wheel-512.png" alt="spinner" className="loadingSpinner"/>
    </div>
    )
}

export default Spinner