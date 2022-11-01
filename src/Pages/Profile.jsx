import React, { useState } from "react";
import { getAuth, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import NavBar from "../Components/NavBar";
import { ReactComponent as ArrowRightIcon } from "../Assets/svg/keyboardArrowRightIcon.svg";
import "../Assets/profilePage.css";
import { useNavigate } from "react-router-dom";

function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();

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

  return (
    <>
      <div className="loggedInBackground">
        <div className="mainContainer">
          <h2 className="accountTitle">Account Settings</h2>
          <hr></hr>
          <div className="personalDetailsHeader">
            <h3>Personal Details</h3>
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
          <hr></hr>

          <div className="itemsForLoan">
            <h3>Your Items For Loan</h3>
            <p>
              Your items will appear here. If you don't have any, upload a thing
            </p>
          </div>
          <hr></hr>

          <div className="borrowedItems">
            <h3>Items you are borrowing</h3>
            <p>You're all set to borrow the following items:</p>
          </div>
          <hr></hr>

          <div className="logOutBlock">
            <button type="button" onClick={onLogout} className="logOut">
              Logout
            </button>
          </div>
        </div>
      </div>
      <NavBar />
    </>
  );
}

export default Profile;
