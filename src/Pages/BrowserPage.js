import React from 'react'
import { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import SearchBar from '../Components/BrowserComponents/SearchBar'

import 'react-datepicker/dist/react-datepicker.css'
import '../Assets/browser.css'
import BrowserGrid from '../Components/BrowserComponents/BrowserGrid'


function BrowserPage() {
    
  return (
    <>
      <body className='BrowserPage'>
        <header>
          <div>
            <h1 className='logo'>VeloRepo Browser</h1>
            <h2>From</h2>

            <ReactDatePicker />

            <h2>To</h2>
            <ReactDatePicker />
          </div>
          <br></br>
          <div>
            <SearchBar />
          </div>
        </header>
      </body>
    </>
  )
}

export default BrowserPage
