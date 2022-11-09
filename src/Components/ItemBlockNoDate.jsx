import React from 'react'
import '../Assets/homePage.css'
import {Link} from 'react-router-dom'

function ItemBlockNoDate({item}) {

  return (
    <>
    <Link to ={`/kit/browse/${item.id}`} className='blockLink' state={{item: item}}>
      <div className='itemBlock'>
        <h3 className='blockHeader'>{item.brand}</h3>
        <h3 className='blockHeader'>{item.name}</h3>
        <p className='blockText'></p>
      </div>
    </Link>
    </>
  )
}

export default ItemBlockNoDate