import React from 'react'
import '../Assets/index.css';
import blacklogo from '../Assets/png/black-logo-small.png';

function BackEndHeader({pageInformation}) {

  const {pageTitle} = pageInformation

  return (
    <header className='backEndHeader'>
      <a href="/welcome"><img src={blacklogo} alt="VeloRepo" className="logo" /></a>
      <h2 className="pageTitle">{pageTitle}</h2>
    </header>
  )
}

export default BackEndHeader