import React from 'react'
import { useState } from 'react'

const SearchBar = ({ handleChange }) => {
  const changeSearchTerm = (e) => {
    handleChange(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleChange(e.target.value)
  }

  return (
    <div className='search-bar'>
      <form onSubmit={handleSubmit}>
        <input
          onChange={changeSearchTerm}
          type='text'
          name='searchTerm'
          placeholder='Filter items'
        />
      </form>
    </div>
  )
}

export default SearchBar
