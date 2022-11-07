import React, {useState} from 'react'
import {getAuth} from 'firebase/auth';
import 'react-datepicker/dist/react-datepicker.css'
import BackEndHeader from '../Components/BackEndHeader'
import '../Assets/homePage.css';
import { FaRegPlusSquare } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { useAuthStatus } from '../Hooks/useAuthStatus';
import Spinner from '../Components/Spinner';
import OwnItemBlock from '../Components/OwnItemBlock';
import BorrowedItemBlock from '../Components/BorrowedItemBlock';

function HomePage({dbUserInfo}) {

  const {loggedIn, checkingStatus} = useAuthStatus()
  const [dbUser, setDbUser] = useState(dbUserInfo)

  const {name, id, firebaseId, email, myItems, borrowedItems} = dbUserInfo

  const userName = dbUserInfo.name
  const firstName = userName.split(" ").shift()

  const pageInformation = {
    pageTitle: "Home"
  }

  if(checkingStatus) {
    return <Spinner/>
  }

  const myStuff = myItems.map((item, id) => {
    return (<OwnItemBlock key={id} item={item}/>)
  })

  const borrowedStuff = borrowedItems.map((item, id) => {
    return (<BorrowedItemBlock key={id} item={item}/>)
  })

  // console.log(myItems[0])

  return (
    <>
      <BackEndHeader pageInformation={pageInformation}/>
      <main className="mainContainer">
      <h3 className="welcomeName">Hey {firstName}! Here's your kit:</h3>
        <div className="itemsForLoan">
          <h3>Your Items For Loan</h3>
          <div className='itemGrid'>
          {myStuff != null ? (
            <>{myStuff}</>
          )
:
          <p className='explainerText'>
            The items you're loaning out to others will appear here. If you don't have any, click on the <FaRegPlusSquare/> to add kit. It'll only be available to people in your community group.
          </p>}
          </div>
        </div>
        <hr></hr>

        <div className="borrowedItems">
          <h3>Items you are borrowing</h3>
          <div className='itemGrid'>
          {borrowedStuff != null ? (
            <>{borrowedStuff}</>
          )
          :
          <p className='explainerText'>Do you need to borrow something for your next adventure? Click on the <FaSearch/> to search your community's shared library for what you need.</p>}
          </div>
        </div>
        <hr></hr>
      </main>
    </>
  )
}

export default HomePage