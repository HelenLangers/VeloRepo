import React, {useState, useEffect, useRef} from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Components/Spinner';
import BackEndHeader from '../Components/BackEndHeader'


function CreateItem() {

  const pageInformation = {
    pageTitle: "Add An Item For Loan"
  }

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    
  })

  const auth = getAuth()
  const navigate = useNavigate()
  const isMounted = useRef(true)


  // check for a user and add their id to the state that will eventually be the whole user's item object
  useEffect(() => {
    if(isMounted){
      onAuthStateChanged(auth, (user) => {
        if(user){
          setFormData({...formData, userRef: user.uid})
        } else {
          navigate('/sign-in')
        }
      })
    }
    return () => {
      isMounted.current = false
    }
  }, [isMounted])

  if(loading){
    return <Spinner/>
  }

  return (
    <>
      <BackEndHeader pageInformation={pageInformation}/>
      
      
    </>
  )
}

export default CreateItem