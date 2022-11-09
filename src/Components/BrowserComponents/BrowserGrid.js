import React from 'react'
import OwnItemBlock from '../OwnItemBlock';

const BrowserGrid = ({items, searchStartDate, searchEndDate })=> {
  const mappedItems = items.map((item, index) => {
  return (
    <OwnItemBlock
    item = {item}
    key = {index}
    searchEndDate={searchEndDate}
    searchStartDate={searchStartDate}
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
