import React from 'react'
import BrowserCard from './BrowserCard'

const BrowserGrid = ({items })=> {
  const mappedItems = items.map((item, index) => {
  return (
    <BrowserCard
    item = {item}
    key = {index}
     />
  )
})

return(
  <>
    <h2>Items:</h2>
  <div className='itemGrid'>
    {mappedItems}
  </div>
</>
)

}

export default BrowserGrid
