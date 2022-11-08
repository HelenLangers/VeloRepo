import React from 'react'
import { useState } from 'react';
import './searchbar.css'

const SearchBar = ({ handleChange , searchTerm }) => {
  const changeSearchTerm = (e) => {
    handleChange(e.target.value)
  }



  return (
    <>
      <form >
        <input
          onChange={changeSearchTerm}
          value={searchTerm}
          type='text'
          name='searchTerm'
          placeholder='Filter items'
          className='searchBar'
        />
      </form>
    </>
  )
}

export default SearchBar
