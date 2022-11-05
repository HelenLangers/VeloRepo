import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import SearchBar from "../Components/BrowserComponents/SearchBar";
import testRepo from "../Repositories/testRepository";
import "react-datepicker/dist/react-datepicker.css";
import "../Assets/browse.css";
import BrowserGrid from "../Components/BrowserComponents/BrowserGrid";
import BackEndHeader from "../Components/BackEndHeader";

function BrowsePage({ items }) {
  const pageInformation = {
    pageTitle: "Browse Kit",
  };

  return (
    <>
      <BackEndHeader pageInformation={pageInformation} />
      <main className="mainContainer">
        <div className="browseSearchBar">
          <div className="datePicker">
            <ReactDatePicker className="DateTo" />
            <h2>To</h2>
            <ReactDatePicker className="DateFrom" />
          </div>

          <div className="SearchBar">
            {/* <SearchBar handleChange={updateSearchTerm} /> */}
          </div>
        </div>
        <BrowserGrid
          items={items}
          // nextFilteredItems={filteredItems}
          className="BrowserGrid"
        />
      </main>
    </>
  );
}

export default BrowsePage;
