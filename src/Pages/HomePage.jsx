import React from 'react'
import {getAuth} from 'firebase/auth';
import 'react-datepicker/dist/react-datepicker.css'
import BackEndHeader from '../Components/BackEndHeader'
import '../Assets/homePage.css';
import { FaRegPlusSquare } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';

function HomePage() {
  const auth = getAuth();
  const userName = auth.currentUser.displayName
  const firstName = userName.split(" ").shift()
  console.log(firstName)

  const pageInformation = {
    pageTitle: "Home"
  }

  return (
    <>
      <BackEndHeader pageInformation={pageInformation}/>
      <main className="mainContainer">
      <h3 className="welcomeName">Hey {firstName}!</h3>
        <div className="itemsForLoan">
          <h3>Your Items For Loan</h3>
          <p className='explainerText'>
            The items you're loaning out to others will appear here. If you don't have any, click on the <FaRegPlusSquare/> at the bottom of the page to add an item. It'll only be available to people in your community group.
          </p>
        </div>
        <hr></hr>

        <div className="borrowedItems">
          <h3>Items you are borrowing</h3>
          <p className='explainerText'>Do you need to borrow something for your next adventure? Click on the <FaSearch/> at the bottom of the page to search your community's shared library for what you need.</p>
        </div>
        <hr></hr>
      </main>
    </>
  )
}

export default HomePage