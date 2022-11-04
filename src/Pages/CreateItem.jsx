import React, { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { db } from "../firebase.config";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import Spinner from "../Components/Spinner";
import BackEndHeader from "../Components/BackEndHeader";
import "../Assets/addItem.css";
import { toast } from "react-toastify";

function CreateItem() {
  const pageInformation = {
    pageTitle: "Add An Item For Loan",
  };

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    subcategory: "",
    brand: "",
    name: "",
    images: {},
  });

  const { category, subcategory, images, brand, name } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  // check for a user and add their id to the state that will eventually be the whole user's item object
  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate("/sign-in");
        }
      });
    }
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  if (loading) {
    return <Spinner />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);

    if (images.length > 6) {
      setLoading(false);
      toast.error("Cannot upload more than 6 images");
      return;
    }

    // store images in firebase
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        // Create a root reference
        const storage = getStorage();
        // create dynamic filename
        const fileName = `${image.name}-${uuidv4()}`;

        // Create a storage reference
        const storageRef = ref(storage, "images/" + fileName);

        // Upload the file
        const uploadTask = uploadBytesResumable(storageRef, image);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            switch (error.code) {
              case "storage/unauthorized":
                // User doesn't have permission to access the object
                break;
              case "storage/canceled":
                // User canceled the upload
                break;

              // ...

              case "storage/unknown":
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    // map through each image that will be uploaded and await all the promises to be completed
    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false);
      toast.error("Images could not be uploaded");
      return;
    });
    console.log(imgUrls);
    setLoading(false);
  };

  const onMutate = (e) => {
    let boolean = null;

    // boolean fields
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      // eslint-disable-next-line
      boolean = false;
    }
    // files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    // text/numbers/boolean
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.boolean ?? e.target.value,
      }));
    }
  };

  return (
    <>
      <BackEndHeader pageInformation={pageInformation} />

      <main className="mainContainer">
        <div className="entryFormBlock">
          <form method="post" className="entryForm" onSubmit={onSubmit}>
            <div className="options">
              <label htmlFor="category">Select a category:</label>
              <select name="category" id="category" onChange={onMutate}>
                <option value="">Please choose a category</option>
                <option value="Camping">Camping</option>
                <option value="Bikes">Bikes</option>
                <option value="Bags">Bags</option>
                <option value="Cooking">Cooking</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
              </select>
            </div>

            <div className="options">
              <label htmlFor="subCategory">Select a subCategory</label>
              <select name="subCategory" id="subCategory" onChange={onMutate}>
                <option value="">Please choose a category</option>
                {(category === "Camping") &&
                  <><option value="Sleeping Bag">Sleeping Bag</option><option value="Sleeping Mat">Sleeping Mat</option><option value="Tent">Tent</option><option value="Bivvy">Bivvy</option></>}
                {(category === "Bikes") &&
                <><option value="Off Road">Off Road</option>
                  <option value="Road">Road</option></>}
                {(category === "Cooking") &&
                <><option value="Stove">Stove</option>
                  <option value="Crockery">Pans, Bowls etc</option></>}
                {(category === "Electronics") &&
                <><option value="Lighting">Lighting</option>
                    <option value="PowerBank">PowerBank</option></>}
                {(category === "Clothing") &&
                <><option value="Insulated">Insulated Items</option>
                  <option value="Waterproof">Waterproof Items</option></>}
                {(category === "Bags") &&
                <><option value="">No subcategories needed</option></>}
              </select>
            </div>

            <div className="options">
              <label htmlFor="brand">Brand:</label>
              <input
                type="text"
                placeholder="e.g. Apidura"
                id="brand"
                onChange={onMutate}
                value={brand}
              />
            </div>

            <div className="options">
              <label htmlFor="name">Name of item:</label>
              <input
                type="text"
                placeholder="e.g. SeatPack"
                id="name"
                onChange={onMutate}
                value={name}
              />
            </div>











            <div className="options">
              <label htmlFor="images">Select Images:</label>
              <input
                type="file"
                id="images"
                accept=".jpg,.jpeg"
                onChange={onMutate}
                multiple
                required
                max="6"
                className="fileInput"
              />
            </div>

            <div className="flexAlignCenter">
              <button type="submit" className="submitButton">
                Create Item
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default CreateItem;
