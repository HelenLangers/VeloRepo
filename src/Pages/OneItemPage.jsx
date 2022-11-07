import React from 'react'
import {useParams} from 'react-router-dom'

function OneItemPage() {

  const { id } = useParams()

  return (
    <div className='mainContainer'>
      <h1>Kit {id}</h1>
    </div>
  )
}

export default OneItemPage