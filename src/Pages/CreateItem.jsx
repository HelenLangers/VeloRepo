import React, {useState, useEffect, useRef} from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Components/Spinner';
import BackEndHeader from '../Components/BackEndHeader'
import '../Assets/addItem.css';


function CreateItem() {

  const pageInformation = {
    pageTitle: "Add An Item For Loan"
  }

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({})

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
    // eslint-disable-next-line
  }, [isMounted])

  if(loading){
    return <Spinner/>
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }


  const onMutate = (e) => {
    let boolean = null

    // boolean fields
    if(e.target.value === 'true') {
      boolean = true
    }
    if(e.target.value === 'false') {
      boolean = false
    }
    // files
    if(e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files
      }))
    }
    // text/numbers/boolean
    if(!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.boolean ?? e.target.value
      }))
    }
  }

  return (
    <>
      <BackEndHeader pageInformation={pageInformation}/>
      
      <main className="mainContainer">
        <div className="entryFormBlock">

          <form method="post" className='entryForm' onSubmit={onSubmit}>
          <div className='options'>
            <label htmlFor="mainCategory">Select a category:</label>
            <select name="mainCategory" id="mainCategory" onChange={onMutate}>
              <option value="">Please choose a category</option>
              <option value="Camping">Camping</option>
              <option value="Bikes">Bikes</option>
            </select>
          </div>


          <div className="options">
            <label htmlFor="subCategory">Select a subCategory</label>
            <select name="subCategory" id="subCategory" onChange={onMutate}>
              <option value="">Please choose a category</option>
              <option value="Sleeping Bag">Sleeping Bag</option>
            </select>
          </div>

          <div className="options">
            <label htmlFor="images">Select Images:</label>
            <input type="file" id="images" max="6" accept=".jpg,.jpeg" onChange={onMutate} className="fileInput"/>
          </div>

          <div className='flexAlignCenter'>
            <button type="submit" className='submitButton'>Create Item</button>
          </div>
          </form>
        </div>
      </main>
    </>
  )
}

export default CreateItem