import React from 'react'
import ReactDatePicker from 'react-datepicker'
import {getAuth} from 'firebase/auth';
import 'react-datepicker/dist/react-datepicker.css'
import BackEndHeader from '../Components/BackEndHeader'
import '../Assets/homePage.css';

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
          <p>
            Your items will appear here. If you don't have any, upload a thing someone can borrow
          </p>
        </div>
        <hr></hr>

        <div className="borrowedItems">
          <h3>Items you are borrowing</h3>
          <p>You're all set to borrow the following items:</p>
        </div>
        <hr></hr>
      </main>
    </>
  )
}

export default HomePage