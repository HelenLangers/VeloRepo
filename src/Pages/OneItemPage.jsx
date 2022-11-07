import React from 'react'
import BackEndHeader from '../Components/BackEndHeader';
import {useParams} from 'react-router-dom'
import { useLocation } from "react-router-dom";

function OneItemPage() {

  const location = useLocation()
  const {item} = location.state;
  const { id } = useParams()

  const pageInformation = {
    pageTitle: "Kit View"
  }

  return (
    <>
      <BackEndHeader pageInformation={pageInformation}/>
      <div className='mainContainer'>
        <h1>{item.name}</h1>
        <div>
          
        </div>
      </div>
    </>
  )
}

export default OneItemPage