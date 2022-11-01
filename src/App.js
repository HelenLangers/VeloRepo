import {useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import getTest from "./Repositories/testRepository";
import NavBar from './Components/NavBar';
import LandingPage from './Pages/LandingPage';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import ForgotPassword from './Pages/ForgotPassword';
import HomePage from './Pages/HomePage';

function App() {

  useEffect(() => {
    getTest()
  }, [])

  return (
    <>
      <Router>
        <NavBar/>
        <Routes>
          <Route path='/' element={<LandingPage />}/>
          <Route path='/welcome' element={<HomePage />}/>
          <Route path='/sign-in' element={<SignIn/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
        </Routes>
      </Router>
      <ToastContainer 
    // default settings:
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    </>
  );
}

export default App;
