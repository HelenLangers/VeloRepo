import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import "../Assets/index.css";
import OAuth from "../Components/OAuth";
import whitelogo from "../Assets/png/white-logo.png";
import visibilityIcon from "../Assets/svg/visibilityIcon.svg";
import { ReactComponent as ArrowRightIcon } from "../Assets/svg/keyboardArrowRightIcon.svg";
import { toast } from "react-toastify";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      // wait for firebase to do it's auth thing
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      // Send user information to postgres database table and get the id back
      const requestOptions = {
        method: 'POST',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "name": name,
          "email": email,
          "firebaseId": user.uid})
      }

      const response = await fetch("http://localhost:8080/users", requestOptions);
      const userObject = await response.json()
      const userObjectId = userObject.id

      // make a document(table) in firebase to cross reference postgres id and firebase id
      updateProfile(auth.currentUser, {
        displayName: name,
      })
      const formDataCopy = { ...formData }
      delete formDataCopy.password
      formDataCopy.postgresId = userObjectId
      formDataCopy.timestamp = serverTimestamp()
      await setDoc(doc(db, 'users', user.uid), formDataCopy)
      
      // redirect to the profile page 
      navigate("/profile");
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === "auth/email-already-in-use") {
        toast.error("Sorry, email already in use");
      } else {
        toast.error("Oops, something went wrong");
      }
    }
  };

  return (
    <div className="imageBackground">
      <header className="landingPageHeader">
        <a href="/">
          <img src={whitelogo} alt="VeloRepo" className="logo" />
        </a>
        <div className="navLinks">
          <Link className="landingPageLinks" to="/sign-up">
            Sign up
          </Link>

          <Link className="landingPageLinks" to="/sign-in">
            Log in
          </Link>
        </div>
      </header>

      <div className="mainContainer">
      <div className="signInBlock">
        <div className="signInBox">
          <div className="flexAlignCentreColumn">
            <h2 className="textAlignCentre welcomeText">Welcome to VeloRepo</h2>
          </div>
          <form onSubmit={onSubmit}>
          {/* <div>
            <select name="orgId" id="orgId" onChange={onChange} className="orgInput">
              <option value="">Please select your community</option>
              <option value="Queens of Pain">Queens of Pain</option>
              <option value="Lakes Gravel Gang">Lakes Gravel Gang</option>
            </select>
          </div> */}

            <input
              type="text"
              className="nameInput"
              placeholder="Name"
              id="name"
              value={name}
              onChange={onChange}
            />
            <input
              type="email"
              className="emailInput"
              placeholder="Email"
              id="email"
              value={email}
              onChange={onChange}
            />
            <div className="passwordInputDiv">
              <input
                type={showPassword ? "text" : "password"}
                className="passwordInput"
                placeholder="Password"
                id="password"
                value={password}
                onChange={onChange}
                minLength="6"
              />
              <img
                src={visibilityIcon}
                alt="show password"
                className="showPassword"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>

            <div className="flexAlignCenter">
              <p className="signInText">Sign Up</p>
              <button className="signInButton">
                <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
              </button>
            </div>
          </form>

          <OAuth />

          <Link to="/sign-in" className="registerLink">
            Already signed up? Log in instead
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}
export default SignUp;
