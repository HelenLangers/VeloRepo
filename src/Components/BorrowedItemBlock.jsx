import React from 'react'

function BorrowedItemBlock({item}) {

    // console.log(item.bookings)


    return (
        <>
        <div className='itemBlock'>
            <h3>{item.name}</h3>
            <p>{item.brand}</p>
            <p></p>
        </div>
        </>
      )
}

export default BorrowedItemBlock