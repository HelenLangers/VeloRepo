import React from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
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