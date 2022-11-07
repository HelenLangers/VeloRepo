import React from 'react'
import '../Assets/homePage.css'

function OwnItemBlock({item}) {
  return (
    <>
    <div className='itemBlock'>
        <h3>{item.name}</h3>
        <p>{item.brand}</p>
    </div>
    </>
  )
}

export default OwnItemBlock