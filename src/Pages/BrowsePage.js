import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import SearchBar from "../Components/BrowserComponents/SearchBar";
import testRepo from "../Repositories/testRepository";
import "react-datepicker/dist/react-datepicker.css";
import "../Assets/browse.css";
import BrowserGrid from "../Components/BrowserComponents/BrowserGrid";
import BackEndHeader from "../Components/BackEndHeader";
import DatePicker from "react-datepicker";



const  BrowserPage =({
  items
 })=>{

  const [searchTerm, setSearchTerm] = useState('')
  const [searchStartDate, setSearchStartDate] = useState('')
  const [endDate, setEndDate] = useState('')


  const filteredItems = items.filter((item) => {
    // if (item.bookings.startDate >= searchStartDate)
    return item.name.toLowerCase().includes(searchTerm)
    // return item.booking.startDate
    })

const filteredDates = filteredItems.filter((item) => {
console.log(item.bookings[0].startDate)
console.log(searchStartDate)
  return  item.bookings.startDate >= searchStartDate.getTime()
})






    const updateSearchTerm= (searchTerm) => {
      setSearchTerm(searchTerm.toLowerCase())
    }


  
    

    const browserGridWithAllItems = <BrowserGrid
            items={items}
            className='BrowserGrid'
            />

    const browserGridWithFilteredItems = <BrowserGrid
            
            items={filteredItems}
            className='BrowserGrid'
          />

    const browserGridWithFilteredDates = <BrowserGrid
            
          items={filteredDates}
          className='BrowserGrid'
        />
    
const pageInformation = {
  pageTitle: "Browse"
}

  

  return (
    <>
      <BackEndHeader pageInformation={pageInformation} />
      <main className="mainContainer">
        <div className="browseSearchBar">
          <div className="datePicker">
            <h2>From</h2>
            <DatePicker selected={searchStartDate} onChange={(date) => setSearchStartDate(date)} />
            <h2>To</h2>
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
          </div>
          <div>
            {searchStartDate ? browserGridWithFilteredDates : browserGridWithAllItems}
          </div>


          <br></br>
          <div className='SearchBar'>
            <SearchBar handleChange={updateSearchTerm} searchTerm={searchTerm} />
          </div>
          {searchTerm ? browserGridWithFilteredItems  : browserGridWithAllItems}
        </div>
      </main>
    </>
  );
}

export default BrowserPage;
