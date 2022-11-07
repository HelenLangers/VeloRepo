import {useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import {ToastContainer, Flip} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth } from "firebase/auth";
import LandingPage from './Pages/LandingPage';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import ForgotPassword from './Pages/ForgotPassword';
import HomePage from './Pages/HomePage';
import BrowsePage from './Pages/BrowsePage';
import Profile from './Pages/Profile';
import PrivateRoute from './Components/PrivateRoute';
import NavBar from './Components/NavBar';
import CreateItem from './Pages/CreateItem';
import NotFound from './Pages/NotFound';
import Information from './Pages/Information';
import Darkmode from 'darkmode-js';
import Spinner from './Components/Spinner';
import {useAuthStatus} from './Hooks/useAuthStatus';
import UserContext from './Context/userContext';
import About from './Pages/About';

function App() {

  const {loggedIn, checkingStatus} = useAuthStatus()
  const [userData, setUserData] = useState({})
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/items')
    .then((res) => res.json())
    .then(results => setItems(results))
  }, [])

  const fetchUserData = async() => {
    try {
      const auth = getAuth()
      const id = auth.currentUser.uid

      const requestOptions = {
        method: 'GET',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      }

      const response = await fetch('http://localhost:8080/users/' + id, requestOptions)
      const data = await response.json()
      setUserData(data)
    } catch (error) {
      console.log('Error', error)}
    } 

  useEffect(() => {
    fetchUserData()
  }, [loggedIn])

  if(checkingStatus) {
    return <Spinner/>
  }

// const findItembyID = function(itemID) {
//   const itemByID = items.filter((item) => item._id == itemID)
//   return itemByID
// }


  return (
    <>
        <Routes>
          <Route path='/' element={<LandingPage />}/>
          <Route path='/sign-in' element={<SignIn/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="*" element={<NotFound/>}/>

          <Route element={<NavBar />}>
            <Route element={<PrivateRoute />}>
              <Route path='/welcome' element={<HomePage userData={userData}/>} />
              <Route path='/profile' element={<Profile userData={userData}/>} />
              <Route path='/create-item' element={<CreateItem userData={userData}/>} />
              <Route path='/browse' element={<BrowsePage items={items}/>} />
              
              <Route path='/information' element={<Information />}/>
              {/* // all routes that need user information go here */}
            </Route>
          </Route>
        </Routes>

      <ToastContainer
        // default settings:
        position='top-right'
        autoClose={5000}
        transition={Flip}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </>
  )
}

export default App;
