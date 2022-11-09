import React from 'react'
import { useState } from 'react';
import '../Assets/browse.css';

const SearchBar = ({ handleChange , searchTerm }) => {
  const changeSearchTerm = (e) => {
    handleChange(e.target.value)
  }

  return (
      <form className='searchForm'>
        <input
          onChange={changeSearchTerm}
          value={searchTerm}
          type='text'
          name='searchTerm'
          placeholder='Filter items'
          className='searchBar'
        />
      </form>
  )
}

export default SearchBar
