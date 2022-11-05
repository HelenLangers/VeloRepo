import React from 'react'
import Item from './Item'


const BrowserCard = ({item})=> {
    // const listOfItems = item.name.map((item, indexOfItem) => {
    //     return (
    //         <Item
    //         key={indexOfItem}
    //         item={item}
    //         />
    //     )
    // })
    

    return (


        <>
        <div className='itemCard'>
            <p>{item.name}</p>
        </div>
        </>
    // <>
    // {listOfItems.length ? (
    //     <>
    //     <div>
    //         <ul>
    //             {listOfItems}
    //         </ul>
    //     </div>
    //     </>
    // ) : null}
    // </>
)
}



export default BrowserCard
