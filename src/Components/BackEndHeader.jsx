import React from 'react'
import '../Assets/index.css';

function BackEndHeader({pageInformation}) {

  const {pageTitle} = pageInformation

  return (
    <header className='backEndHeader'>
      <h2 className="pageTitle">{pageTitle}</h2>
    </header>
  )
}

export default BackEndHeader