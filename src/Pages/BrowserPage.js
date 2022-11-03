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
            <p>Welcome to the VeloRepo, please select your criteria to search for an item</p>
            <h2>From</h2>

            <ReactDatePicker className='DateTo'/>

            <h2>To</h2>
            <ReactDatePicker className='DateFrom' />
          </div>
          <br></br>
          <div className='SearchBar'>
            <SearchBar />
          </div>
            <BrowserGrid className='BrowserGrid'/>
          
        </header>
      </body>
    </>
  )
}

export default BrowserPage
