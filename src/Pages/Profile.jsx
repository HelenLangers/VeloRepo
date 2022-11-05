import React, { useState } from "react";
import { getAuth, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { ReactComponent as ArrowRightIcon } from "../Assets/svg/keyboardArrowRightIcon.svg";
import "../Assets/profilePage.css";
import { useNavigate } from "react-router-dom";
import BackEndHeader from "../Components/BackEndHeader";
import { useAuthStatus } from "../Hooks/useAuthStatus";
import Spinner from "../Components/Spinner";

function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const {loggedIn, checkingStatus} = useAuthStatus()

  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update display name in firebase
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // Update in firestore
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name: name,
        });
      }
    } catch (error) {
      toast.error("Could not update profile details");
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("A password reset email has been sent");
    } catch (error) {
      toast.error("Could not send reset email");
    }
  };

  const pageInformation = {
    pageTitle: "Account Details"
  }

  if(checkingStatus) {
    return <Spinner/>
  }

  return (
    <>
      <div className="loggedInBackground">
        <BackEndHeader pageInformation={pageInformation}/>

        <main className="mainContainer">
          <div className="personalDetailsHeader">
            <h3>Login Information</h3>
            <p
              className="changePersonalDetails"
              onClick={() => {
                changeDetails && onSubmit();
                setChangeDetails((prevState) => !prevState);
              }}
            >
              {changeDetails ? "Done" : "Change"}
            </p>
          </div>
          <div className="profileCard">
            <form>
              <input
                type="text"
                className={!changeDetails ? "profileName" : "profileNameActive"}
                id="name"
                disabled={!changeDetails}
                value={name}
                onChange={onChange}
              />
              <input
                type="text"
                className={
                  !changeDetails ? "profileEmail" : "profileEmailActive"
                }
                id="email"
                disabled={!changeDetails}
                value={email}
                onChange={onChange}
              />
            </form>
            <div className="passwordRequest">
              <p className="signInText">Request Password Reset</p>
              <button
                type="button"
                onClick={handleClick}
                className="signInButton"
              >
                <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
              </button>
            </div>
          </div>
          <hr/>

          <div className="locationHeader">
            <h3>Your Address</h3>
            <p className="addressParagraph">Your address will only be used to determine your distance from other users.</p>
          </div>
            <div className="profileCard">
              <form>
                <input type="text" className="profileAddress" placeholder="Please enter your address"/>
              </form>
          </div>



          <hr/>
          <div className="logOutBlock">
            <button type="button" className="logoutButton" onClick={onLogout}>
              Logout
            </button>
          </div>
        </main>
      </div>
    </>
  );
}

export default Profile;
