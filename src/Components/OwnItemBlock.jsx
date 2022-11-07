import React from 'react'
import '../Assets/homePage.css'
import {Link} from 'react-router-dom'

function OwnItemBlock({item}) {




  return (
    <>
    <div className='itemBlock'>
        <h3>{item.name}</h3>
        <p>{item.brand}</p>
        <Link to ="/browsekit/">Kit</Link>
    </div>
    </>
  )
}

export default OwnItemBlock