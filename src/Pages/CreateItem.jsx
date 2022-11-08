import React, { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import Spinner from "../Components/Spinner";
import BackEndHeader from "../Components/BackEndHeader";
import "../Assets/addItem.css";
import { toast } from "react-toastify";

function CreateItem({userData}) {
  const pageInformation = {
    pageTitle: "Add Kit",
  };


  const [loading, setLoading] = useState(false);
  const [categoriesFromDB, setCategoriesFromDB] = useState([])
  const [chosenCategoryId, setChosenCategoryId] = useState(1)
  const [subCategories, setSubCategories] = useState([])
  const [formData, setFormData] = useState({
    category_id: "",
    sub_category_id: "",
    brand: "",
    name: "",
    images: {},
    owner_id: userData.fireBaseId,
  });

  const { category_id, sub_category_id, images, brand, name } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  // check for a user and add their id to the state that will eventually be the whole user's item object
  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          fetchCategoriesFromDB()
          setFormData({ ...formData, owner_id: userData.fireBaseId});
        } else {
          navigate("/sign-in");
        }
      });
    }
    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line
  }, [isMounted]);

  const fetchCategoriesFromDB = async() => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
      }

      const response = await fetch('http://localhost:8080/categories', requestOptions)
      const data = await response.json()
      setCategoriesFromDB(data)
    } catch (error) {
      console.log('Error', error)}
    }
  
  const onCategorySelect = (e) => {
    setChosenCategoryId(e.target.value)

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    const findSubcategories = categoriesFromDB.find((category) => category.id == +chosenCategoryId)
    setSubCategories(findSubcategories.subCategorys)
  }


  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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

    const formDataCopy = {...formData, imgUrls}
    delete formDataCopy.images;
    console.log(formDataCopy)
    
    const requestOptions = {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body:JSON.stringify(formDataCopy)
    }

    const response = await fetch("http://localhost:8080/items", requestOptions);
    if (response.ok) {
      navigate("/kit");
    }
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


  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <BackEndHeader pageInformation={pageInformation} />

      <main className="mainContainer">
        <div className="entryFormBlock">
          <form method="post" className="entryForm" onSubmit={onSubmit}>
            <div className="options">
              <label htmlFor="category_id">Select a category:</label>
              <select name="category_id" id="category_id" onChange={onCategorySelect}>
              <option value="">Please choose a category</option>
              {categoriesFromDB.map((category, index) => (
                <option key={index} value={category.id}>{category.categoryName}</option>
              ))}
              </select>
            </div>

            <div className="options">
              <label htmlFor="sub_category_id">Select a subcategory</label>
              <select name="sub_category_id" id="sub_category_id" onChange={onMutate}>
                <option value="">Please choose a category</option>
                {category_id === "1" && (
                  <>
                    <option value="3">Sleeping Bag</option>
                    <option value="4">Sleeping Mat</option>
                    <option value="1">Tent</option>
                    <option value="2">Bivvy</option>
                  </>
                )}
                {category_id === "3" && (
                  <>
                    <option value="6">Off Road</option>
                    <option value="5">Road</option>
                  </>
                )}
                {category_id === "5" && (
                  <>
                    <option value="10">Stove</option>
                    <option value="9">Crockery</option>
                  </>
                )}
                {category_id === "6" && (
                  <>
                    <option value="13">Lighting</option>
                    <option value="12">PowerBank</option>
                  </>
                )}
                {category_id === "4" && (
                  <>
                    <option value="7">Insulated</option>
                    <option value="8">Waterproof</option>
                  </>
                )}
                {category_id === "2" && (
                  <>
                    <option value="null">Bag</option>
                  </>
                )}
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

            {sub_category_id === "2" && (
              <>
                <div className="options">
                  <label htmlFor="packSize">Packed Size:</label>
                  <input
                    type="text"
                    placeholder="e.g. 10 x 15 x 20 cm"
                    id="packSize"
                    onChange={onMutate}
                  />
                </div>

                <div className="options">
                  <label htmlFor="hooped">Hooped?</label>
                  <select name="hooped" id="hooped" onChange={onMutate}>
                    <option value="True">True</option>
                    <option value="False">False</option>
                  </select>
                </div>

                <div className="options">
                  <label htmlFor="weight">Weight:</label>
                  <input
                    type="text"
                    placeholder="e.g. 500g"
                    id="weight"
                    onChange={onMutate}
                  />
                </div>
              </>
            )}

            {sub_category_id === "1" && (
              <>
                <div className="options">
                  <label htmlFor="weight">Weight:</label>
                  <input
                    type="text"
                    placeholder="e.g. 500g"
                    id="weight"
                    onChange={onMutate}
                  />
                </div>

                <div className="options">
                  <label htmlFor="packSize">Packed Size:</label>
                  <input
                    type="text"
                    placeholder="e.g. 10 x 15 x 20 cm"
                    id="packSize"
                    onChange={onMutate}
                  />
                </div>

                <div className="options">
                  <label htmlFor="capacity">Capacity:</label>
                  <input
                    type="text"
                    placeholder="e.g. 1 person tent"
                    id="capacity"
                    onChange={onMutate}
                  />
                </div>

                <div className="options">
                  <label htmlFor="footprint">Footprint Included?</label>
                  <select name="footprint" id="footprint" onChange={onMutate}>
                    <option value="True">True</option>
                    <option value="False">False</option>
                  </select>
                </div>

                {/* add pole type here */}
              </>
            )}

            {sub_category_id === "3" && (
              <>
                <div className="options">
                  <label htmlFor="weight">Weight:</label>
                  <input
                    type="text"
                    placeholder="e.g. 500g"
                    id="weight"
                    onChange={onMutate}
                  />
                </div>

                <div className="options">
                  <label htmlFor="packSize">Packed Size:</label>
                  <input
                    type="text"
                    placeholder="e.g. 10 x 15 x 20 cm"
                    id="packSize"
                    onChange={onMutate}
                  />
                </div>

                <div className="options">
                  <label htmlFor="comfortRating">Comfort Rating:</label>
                  <input
                    type="text"
                    placeholder="e.g. 3 degrees C"
                    id="comfortRating"
                    onChange={onMutate}
                  />
                </div>

                {/* add insulation type and season rating here */}
              </>
            )}

            {sub_category_id === "4" && (
              <>
                <div className="options">
                  <label htmlFor="weight">Weight:</label>
                  <input
                    type="text"
                    placeholder="e.g. 500g"
                    id="weight"
                    onChange={onMutate}
                  />
                </div>

                <div className="options">
                  <label htmlFor="packSize">Packed Size:</label>
                  <input
                    type="text"
                    placeholder="e.g. 10 x 15 x 20 cm"
                    id="packSize"
                    onChange={onMutate}
                  />
                </div>

                <div className="options">
                  <label htmlFor="thickness">Thickness (cm):</label>
                  <input
                    type="number"
                    placeholder="e.g. 6"
                    id="thickness"
                    onChange={onMutate}
                  />
                </div>

                {/* add season rating here */}
              </>
            )}

            {sub_category_id === "6" && (
              <>
                <div className="options">
                  <label htmlFor="size">Size:</label>
                  <input
                    type="text"
                    placeholder="e.g. 58cm"
                    id="size"
                    onChange={onMutate}
                  />
                </div>
                {/* add suspension type here */}
              </>
            )}

            {sub_category_id === "5" && (
              <>
                <div className="options">
                  <label htmlFor="size">Size:</label>
                  <input
                    type="text"
                    placeholder="e.g. 58cm"
                    id="size"
                    onChange={onMutate}
                  />
                </div>
                {/* add brake type here */}
              </>
            )}

            {sub_category_id === "null" && (
              <>
                {/* add bag location here */}

                <div className="options">
                  <label htmlFor="capacity">Capacity:</label>
                  <input
                    type="text"
                    placeholder="e.g. 15L"
                    id="capacity"
                    onChange={onMutate}
                  />
                </div>
              </>
            )}

            {sub_category_id === "10" && (
              <>
                {/* add fuel type here */}

                <div className="options">
                  <label htmlFor="weight">Weight:</label>
                  <input
                    type="text"
                    placeholder="e.g. 500g"
                    id="weight"
                    onChange={onMutate}
                  />
                </div>

                <div className="options">
                  <label htmlFor="diameter">Diameter:</label>
                  <input
                    type="text"
                    placeholder="e.g. 20cm"
                    id="diameter"
                    onChange={onMutate}
                  />
                </div>

                <div className="options">
                  <label htmlFor="allInOne">All In One Set?</label>
                  <select name="allInOne" id="allInOne" onChange={onMutate}>
                    <option value="True">True</option>
                    <option value="False">False</option>
                  </select>
                </div>
              </>
            )}

            {sub_category_id === "9" && (
              <>
                <div className="options">
                  <label htmlFor="weight">Weight:</label>
                  <input
                    type="text"
                    placeholder="e.g. 500g"
                    id="weight"
                    onChange={onMutate}
                  />
                </div>

                <div className="options">
                  <label htmlFor="diameter">Diameter:</label>
                  <input
                    type="text"
                    placeholder="e.g. 20cm"
                    id="diameter"
                    onChange={onMutate}
                  />
                </div>

                <div className="options">
                  <label htmlFor="capacity">Capacity:</label>
                  <input
                    type="text"
                    placeholder="e.g. 5L"
                    id="capacity"
                    onChange={onMutate}
                  />
                </div>
              </>
            )}

            {sub_category_id === "13" && (
              <>
                {/* add lighting type here */}

                <div className="options">
                  <label htmlFor="lumens">Lumens:</label>
                  <input
                    type="number"
                    placeholder="e.g. 500"
                    id="lumens"
                    onChange={onMutate}
                  />
                </div>

                <div className="options">
                  <label htmlFor="rechargeable">Rechargeable?</label>
                  <select
                    name="rechargeable"
                    id="rechargeable"
                    onChange={onMutate}
                  >
                    <option value="True">True</option>
                    <option value="False">False</option>
                  </select>
                </div>
              </>
            )}

            {sub_category_id === "12" && (
              <>
                <div className="options">
                  <label htmlFor="capacity">Capacity (mAh):</label>
                  <input
                    type="number"
                    placeholder="e.g. 10000"
                    id="capacity"
                    onChange={onMutate}
                  />
                </div>

                <div className="options">
                  <label htmlFor="size">Physical Size:</label>
                  <input
                    type="text"
                    placeholder="e.g. 10 x 15 x 2 cm"
                    id="size"
                    onChange={onMutate}
                  />
                </div>

                <div className="options">
                  <label htmlFor="rechargeable">Rechargeable?</label>
                  <select
                    name="rechargeable"
                    id="rechargeable"
                    onChange={onMutate}
                  >
                    <option value="True">Yes</option>
                    <option value="False">No</option>
                  </select>
                </div>
              </>
            )}

            {sub_category_id === "11" && (
              <>
                <div className="options">
                  <label htmlFor="rechargeable">Rechargeable?</label>
                  <select
                    name="rechargeable"
                    id="rechargeable"
                    onChange={onMutate}
                  >
                    <option value="True">Yes</option>
                    <option value="False">No</option>
                  </select>
                </div>
              </>
            )}

            {sub_category_id === "7" && (
              <>
                <div className="options">
                  <label htmlFor="size">Size:</label>
                  <input
                    type="text"
                    placeholder="e.g. Size 12"
                    id="size"
                    onChange={onMutate}
                  />
                </div>
                {/* insulation type here */}
              </>
            )}

            {sub_category_id === "8" && (
              <>
                <div className="options">
                  <label htmlFor="size">Size:</label>
                  <input
                    type="text"
                    placeholder="e.g. Size 12"
                    id="size"
                    onChange={onMutate}
                  />
                </div>
                {/* add waterproof rating here */}
              </>
            )}

            <div className="options">
              <label htmlFor="images">Select Images (max 6):</label>
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
