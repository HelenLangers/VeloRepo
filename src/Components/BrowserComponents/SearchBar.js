import React from 'react'
import { useState } from 'react'

const SearchBar = ({ handleChange , searchTerm }) => {
  const changeSearchTerm = (e) => {
    handleChange(e.target.value)
  }



  return (
    <div className='search-bar'>
      <form >
        <input
          onChange={changeSearchTerm}
          value={searchTerm}
          type='text'
          name='searchTerm'
          placeholder='Filter items'
        />
      </form>
    </div>
  )
}

export default SearchBar
