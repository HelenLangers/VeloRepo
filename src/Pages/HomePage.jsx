import React from 'react'
import BackEndHeader from '../Components/BackEndHeader'

function HomePage() {

  const pageInformation = {
    pageTitle: "Home"
  }

  return (
    <>
      <BackEndHeader pageInformation={pageInformation}/>
      
    </>
  )
}

export default HomePage