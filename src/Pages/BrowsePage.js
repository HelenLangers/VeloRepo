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



const  BrowserPage =({
  items
 })=>{


  const [searchTerm, setSearchTerm] = useState('')

  const filteredItems = items.filter((item) => {
    //take the item
    //true or false if item meets filter criteria

    
    return item.name.toLowerCase().includes(searchTerm)



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
    
const pageInformation = {
  pageTitle: "Browse"
}

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


          <br></br>
          <div className='SearchBar'>
            <SearchBar handleChange={updateSearchTerm} searchTerm={searchTerm} />
          </div>
          {searchTerm ? browserGridWithFilteredItems : browserGridWithAllItems}

      </main>
    </>
  );
}

export default BrowsePage;
