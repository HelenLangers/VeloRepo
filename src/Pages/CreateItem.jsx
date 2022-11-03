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

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState, 
      [e.target.id]: e.target.value
    }))
  }

  const onMutate = () => {}

  return (
    <>
      <BackEndHeader pageInformation={pageInformation}/>
      
      <main className="mainContainer">
        <div className="entryFormBlock">
          <form method="post" className='entryForm'>
          <div className='options'>
            <label htmlFor="mainCategory">Select a category:</label>
            <select name="mainCategory" id="mainCategory" onChange={onChange}>
              <option value="">Please choose a category</option>
              <option value="Camping">Camping</option>
              <option value="Bikes">Bikes</option>
            </select>
          </div>


          <div className="options">
            <label htmlFor="subCategory">Select a subCategory</label>
            <select name="subCategory" id="subCategory" onChange={onChange}>
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