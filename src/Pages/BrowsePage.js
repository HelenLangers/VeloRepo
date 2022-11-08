import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import SearchBar from "../Components/BrowserComponents/SearchBar";
import testRepo from "../Repositories/testRepository";
import "react-datepicker/dist/react-datepicker.css";
import "../Assets/browse.css";
import BrowserGrid from "../Components/BrowserComponents/BrowserGrid";
import BackEndHeader from "../Components/BackEndHeader";
import DatePicker from "react-datepicker";
import { DateTime } from "luxon";
import { ReactUTCDatepicker } from "react-utc-datepicker";


const BrowsePage = ({items}) => {

  const [searchTerm, setSearchTerm] = useState('')
  const [searchStartDate, setSearchStartDate] = useState('')
  const [searchEndDate, setSearchEndDate] = useState('')

  const filteredItems = items.filter((item) => {

    if (searchTerm && searchStartDate && searchEndDate) {
      return item.name.toLowerCase().includes(searchTerm) && item.bookings[0].startDate >= searchStartDate && item.bookings[0].endDate <= searchEndDate
    }
    if (searchTerm && searchStartDate) {
      return item.name.toLowerCase().includes(searchTerm) && item.bookings[0].startDate >= searchStartDate
    }

    if (searchTerm && searchEndDate) {
      return item.name.toLowerCase().includes(searchTerm) && item.bookings[0].endDate <= searchEndDate
    }

    if (searchStartDate && searchEndDate) {
      return item.bookings[0].endDate <= searchEndDate && item.bookings[0].startDate >= searchStartDate
    }

    if (searchTerm) {
      return item.name.toLowerCase().includes(searchTerm)
    }

    if (searchStartDate) {
      return item.bookings[0].startDate >= searchStartDate
    }

    if (searchEndDate) {
      return item.bookings[0].endDate <= searchEndDate
    }
    // comment this 
    return true
  })




  const filteredStartDates = items.filter((item) => {
    return item.bookings[0].startDate >= searchStartDate
  })

  const filteredEndDates = items.filter((item) => {
    return item.bookings[0].endDate <= searchEndDate
  })


  const updateSearchTerm = (searchTerm) => {
    setSearchTerm(searchTerm.toLowerCase())
  }


  const browserGrid = <BrowserGrid

    items={filteredItems}
    className='BrowserGrid'
  />


  const pageInformation = {
    pageTitle: "Browse"

  }


  return (
    <>
      <BackEndHeader pageInformation={pageInformation} />

      <section className="datePickerAndSearch">
        <div className="datePickerLeft">
          <h2>From</h2>
          <ReactUTCDatepicker format="YYYY-MM-DDT00:00:00.000+00:00" selected={searchStartDate} onChange={(date) => setSearchStartDate(date)} />
          <h2>To</h2>
          <ReactUTCDatepicker format="YYYY-MM-DDT00:00:00.000+00:00" selected={searchEndDate} onChange={(date) => setSearchEndDate(date)} />
        </div>

        <div className='SearchBarRight'>
          <SearchBar handleChange={updateSearchTerm} searchTerm={searchTerm} />
        </div>
      </section>


      <main className="mainContainer">
        <div className="browserGrid">
          {browserGrid}
        </div>
      </main>
    </>
  );
}

export default BrowsePage;


  // const browserGridWithFilteredStartDates = <BrowserGrid

  //   items={filteredStartDates}
  //   className='BrowserGrid'
  // />

  // const browserGridWithFilteredEndDates = <BrowserGrid

  //   items={filteredEndDates}
  //   className='BrowserGrid'
  // />
