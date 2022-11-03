import React from 'react'
import BackEndHeader from '../Components/BackEndHeader'
import '../Assets/homePage.css';

function HomePage() {

  const pageInformation = {
    pageTitle: "Home"
  }

  return (
    <>
      <BackEndHeader pageInformation={pageInformation}/>
      <main className="mainContainer">
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