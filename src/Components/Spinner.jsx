import React from 'react'
import '../Assets/spinner.css';
import SpinnerImage from '../Assets/png/spinner.png';

function Spinner() {
    return (
    <div className='loadingSpinnerContainer'>
        <img src={SpinnerImage} alt="spinner" className="loadingSpinner"/>
    </div>
    )
}

export default Spinner