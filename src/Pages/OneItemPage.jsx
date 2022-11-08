import React from 'react'
import BackEndHeader from '../Components/BackEndHeader';
import {useParams} from 'react-router-dom'
import { useLocation } from "react-router-dom";
import ImageSlider from '../Components/ImageSlider/ImageSlider';


function OneItemPage() {

  const location = useLocation()
  const {item} = location.state;
  const { id } = useParams()

  const pageInformation = {
    pageTitle: "Kit View"
  }

  const SliderData = [
    {
      image: 'https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw3498dd9d/images/hi-res/85245_LCUB.jpg?sw=1914&sh=1914&sfrm=png&q=95&bgcolor=f5f5f5'
    },
    {
      image: 'https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw49a83c36/images/hi-res/85245_LCUB_MZ2.jpg?sw=1736&sh=1736&sfrm=png&q=95&bgcolor=f5f5f5'
    },
    {
      image: 'https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwb99b9863/images/hi-res/85245_LCUB_MZ1.jpg?sw=1736&sh=1736&sfrm=png&q=95&bgcolor=f5f5f5'
    }
  ]

  return (
    <>
      <BackEndHeader pageInformation={pageInformation}/>
      <div className='mainContainer'>
        <h1>The {item.brand} {item.name}</h1>
          <div className='imageCarousel'>
            <ImageSlider SliderData={SliderData}/>
          </div>
      </div>
    </>
  )
}

export default OneItemPage