import React, {useState} from 'react'
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa'
import Spinner from '../Spinner';
import './slider.css'

const ImageSlider = ({SliderData}) => {

    const [currentImage, setCurrentImage] = useState(0)
    const length = SliderData.length

    if(!Array.isArray(SliderData) || SliderData.length <= 0) {
        return <Spinner/>
    }

    const prevSlide = () => {
        setCurrentImage(currentImage === 0 ? length - 1 : currentImage - 1)
    }

    const nextSlide = () => {
        setCurrentImage(currentImage === length - 1 ? 0 : currentImage + 1)
    }

  return (
    <div className='slider'>
    <FaArrowAltCircleLeft className='leftArrow' onClick={prevSlide}/>
    <FaArrowAltCircleRight className='rightArrow' onClick={nextSlide}/>
        {SliderData.map((slide, index) => {
            return(
                <div className={index===currentImage ? 'slide active' : 'slide'} key={index}>
                    {index === currentImage && (<img key={index} src={slide.image} alt="product shot" className="image"/>)}
                    
                </div>
            )
        })}
    </div>
  )
}

export default ImageSlider