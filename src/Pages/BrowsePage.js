import React, { useState } from "react";
import SearchBar from "../Components/BrowserComponents/SearchBar";
import "react-datepicker/dist/react-datepicker.css";
import "../Assets/browse.css";
import BrowserGrid from "../Components/BrowserComponents/BrowserGrid";
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

  const browserGrid = (
    <BrowserGrid
      items={filteredItems}
      searchStartDate={searchStartDate}
      searchEndDate={searchEndDate}
      className="BrowserGrid"
    />
  );

  const pageInformation = {
    pageTitle: "Browse",
  };

  return (
    <>
      <BackEndHeader pageInformation={pageInformation} />

      <section className="datePickerAndSearch">
        <div className="datePickerLeft">
          <h2>From</h2>
          <ReactUTCDatepicker
            format="YYYY-MM-DDT00:00:00.000+00:00"
            selected={searchStartDate}
            onChange={(date) => setSearchStartDate(date)}
          />
          <h2>To</h2>
          <ReactUTCDatepicker
            format="YYYY-MM-DDT00:00:00.000+00:00"
            selected={searchEndDate}
            onChange={(date) => setSearchEndDate(date)}
          />
        </div>

        <div className="SearchBarRight">
          <SearchBar handleChange={updateSearchTerm} searchTerm={searchTerm} />
        </div>
      </section>

      <main className="mainContainer">
        <div className="browserGrid">{browserGrid}</div>
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
