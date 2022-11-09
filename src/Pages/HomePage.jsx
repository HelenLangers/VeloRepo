import React from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import BackEndHeader from '../Components/BackEndHeader'
import '../Assets/homePage.css';
import { FaRegPlusSquare } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import Spinner from '../Components/Spinner';
import OwnItemBlock from '../Components/OwnItemBlock';
import ItemBlockNoDate from '../Components/ItemBlockNoDate';

function HomePage({userData}) {

  if(Object.keys(userData).length === 0){
    return <Spinner/>
  }

  const {name, myItems, borrowedItems} = userData

  const firstName = name.split(" ").shift()

  const pageInformation = {
    pageTitle: "Home"
  }
  
  const myStuff = myItems.map((item, id) => {
    return (<ItemBlockNoDate key={id} item={item}/>)
  })

  const borrowedStuff = borrowedItems.map((item, id) => {
    return (<OwnItemBlock key={id} item={item}/>)
  })


  return (
    <>
      <BackEndHeader pageInformation={pageInformation}/>
      <main className="mainContainer">
      <h3 className="welcomeName">Hey {firstName}! Here's your kit:</h3>
        <div className="itemsForLoan">
          <h3>Your Kit For Loan</h3>
          <div className='itemGrid'>
          {myStuff.length !== 0 ? (
            <>{myStuff}</>
          )
          :
          <p className='explainerText'>
            The items you're loaning out to others will appear here. If you don't have any, click on the <FaRegPlusSquare/> to add kit. It'll only be available to people in your community group.
          </p>}
          </div>
        </div>
        <hr></hr>

        {/* <div className="borrowedItems">
          <h3>Kit You Are Borrowing</h3>
          <div className='itemGrid'>
          {borrowedStuff.length !== 0 ? (
            <>{borrowedStuff}</>
          )
          :
          <p className='explainerText'>Do you need to borrow something for your next adventure? Click on the <FaSearch/> to search your community's shared library for what you need.</p>}
          </div>
        </div>
        <hr></hr> */}
      </main>
    </>
  )
}

export default HomePage