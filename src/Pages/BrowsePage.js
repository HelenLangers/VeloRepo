import React, {useState} from 'react'
import ReactDatePicker from 'react-datepicker'
import SearchBar from '../Components/BrowserComponents/SearchBar'
import testRepo from '../Repositories/testRepository'
import 'react-datepicker/dist/react-datepicker.css'
import '../Assets/browse.css'
import BrowserGrid from '../Components/BrowserComponents/BrowserGrid'
import BackEndHeader from '../Components/BackEndHeader'


function BrowserPage ({items}){

  console.log(items)
  
//   items,
  

// }) =>{
//   const [searchTerm, setSearchTerm] = useState('')

//   const filteredItems = items.map((item) => {
//     const nextFilteredItems = items.name.filter((item))
    

//     return {
//       ...item,
//       userItems: nextFilteredItems,
//     }
//     })

//     const updateSearchTerm= (searchTerm) => {
//       setSearchTerm(searchTerm.toLowerCase())
//     }
  

    
const pageInformation = {
  pageTitle: "Browse"
}

  
  return (
    

    
    <>
    <BackEndHeader pageInformation={pageInformation}/>
      <main className='BrowserPage'>
          <div>
            <ReactDatePicker className='DateTo'/>

            <h2>To</h2>
            <ReactDatePicker className='DateFrom' />
          </div>

          <br></br>
          <div className='SearchBar'>
            {/* <SearchBar handleChange={updateSearchTerm} /> */}
          </div>
          
            <BrowserGrid
            items={items}
            // nextFilteredItems={filteredItems}
            className='BrowserGrid'/>
        
      </main>
    </>
  )
}


export default BrowserPage
