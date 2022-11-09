import React, { useState } from "react";
import SearchBar from "../Components/SearchBar";
import "react-datepicker/dist/react-datepicker.css";
import "../Assets/browse.css";
import BrowserGrid from "../Components/BrowserGrid";
import BackEndHeader from "../Components/BackEndHeader";
import { ReactUTCDatepicker } from "react-utc-datepicker";
import Spinner from "../Components/Spinner";

const BrowsePage = ({ items, userData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchStartDate, setSearchStartDate] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");
   if(Object.keys(userData).length === 0){
    return <Spinner/>
  }

  const checkIfIsBookedDuringSearchParamas = (item) => {
    for (let booking in item.bookings) {
      if (
        booking.startDate >= searchStartDate &&
        booking.endDate <= searchEndDate
      ) {
        return false;
      }
    }
    return true;
  };

  const filteredItems = items.filter((item) => {
    if (searchTerm && searchStartDate && searchEndDate) {
      return (
        item.name.toLowerCase().includes(searchTerm) &&
        checkIfIsBookedDuringSearchParamas(item)
      );
    }
    if (searchTerm && searchStartDate && item.bookings.length > 0) {
      return (
        item.name.toLowerCase().includes(searchTerm) &&
        item.bookings[0].startDate >= searchStartDate
      );
    }

    if (searchTerm && searchEndDate && item.bookings.length > 0) {
      return (
        item.name.toLowerCase().includes(searchTerm) &&
        item.bookings[0].endDate <= searchEndDate
      );
    }

    if (searchStartDate && searchEndDate && item.bookings.length > 0) {
      return (
        item.bookings[0].endDate <= searchEndDate &&
        item.bookings[0].startDate >= searchStartDate
      );
    }

    if (searchTerm) {
      return item.name.toLowerCase().includes(searchTerm);
    }

    if (searchStartDate && item.bookings.length > 0) {
      return item.bookings[0].startDate >= searchStartDate;
    }

    if (searchEndDate && item.bookings.length > 0) {
      return item.bookings[0].endDate <= searchEndDate;
    }

    // Adds the item to the list if no filters are in place
    return true;
  });

  // const filteredStartDates = items.filter((item) => {
  //   return item.bookings[0].startDate >= searchStartDate
  // })

  // const filteredEndDates = items.filter((item) => {
  //   return item.bookings[0].endDate <= searchEndDate
  // })

  const updateSearchTerm = (searchTerm) => {
    setSearchTerm(searchTerm.toLowerCase());
  };


  const handleStartDateSelect = (e) => {
    const formatStartDate = e + 'T00:00:00.000+00:00'
    setSearchStartDate(formatStartDate)
  }

  const handleEndDateSelect = (e) => {
    const formatEndDate = e + 'T00:00:00.000+00:00'
    setSearchEndDate(formatEndDate)
  }


  const pageInformation = {
    pageTitle: "Browse",
  };

  return (
    <>
      <BackEndHeader pageInformation={pageInformation} />

      <section className="datePickerAndSearch">
        <div className="datePickerLeft">
        <h3 className="datePickerTitle">I want to rent from...</h3>
          <div className="dateSelectors">
          <div className="startDate">
          <p>Start Date:</p>
          <ReactUTCDatepicker
            format="YYYY-MM-DD"
            selected={searchStartDate}
            buttonPosition="before"
            onChange={handleStartDateSelect}
          />
          </div>
          <div className="endDate">
          <p>End Date:</p>
          <ReactUTCDatepicker
            format="YYYY-MM-DD"
            selected={searchEndDate}
            buttonPosition="before"
            onChange={handleEndDateSelect}
          />
          </div>
        </div>
        </div>
        <div className="SearchBarRight">
        <h3 className="searchTitle">Anything specific?</h3>
          <SearchBar handleChange={updateSearchTerm} searchTerm={searchTerm} />
        </div>
      </section>

      <main className="mainContainer">
        <BrowserGrid
          items={filteredItems}
          searchStartDate={searchStartDate}
          searchEndDate={searchEndDate}
          className="BrowserGrid"
        />
      </main>
    </>
  );
};

export default BrowsePage;

// const browserGridWithFilteredStartDates = <BrowserGrid

//   items={filteredStartDates}
//   className='BrowserGrid'
// />

// const browserGridWithFilteredEndDates = <BrowserGrid

//   items={filteredEndDates}
//   className='BrowserGrid'
// />
