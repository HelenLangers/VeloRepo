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
  
  const [itemName, setItemName] = useState('')
  const [itemBrand, setItemBrand] = useState('')
  const [itemCategoryId, setItemCategoryId] = useState('')
  const [itemSubCategoryId, setItemSubCategoryId] = useState('')
  const [itemAtType, setItemAtType] = useState('')
  const [itemPackSize, setItemPackSize] = useState('')
  const [itemHoopedBoolean, setItemHoopedBoolean] = useState('')
  const [itemFootprintBoolean, setItemFootprintBoolean] = useState('')
  const [itemWeight, setItemWeight] = useState('')
  const [itemCapacity, setItemCapacity] = useState('')
  const [itemComfortRating, setItemComfortRating] = useState('')
  const [itemThickness, setItemThickness] = useState()
  const [itemSize, setItemSize] = useState('')
  const [itemDiameter, setItemDiameter] = useState('')
  const [itemSetBoolean, setItemSetBoolean] = useState('')
  const [itemLumens, setItemLumens] = useState('')
  const [itemRechargeableBoolean, setItemRechargeableBoolean] = useState('')
  const [itemPoleType, setItemPoleType] = useState('')
  const [itemInsulationType, setItemInsulationType] = useState('')
  const [itemSeasonType, setItemSeasonType] = useState('')
  const [itemSuspension, setItemSuspension] = useState('')
  const [itemBrakeType, setItemBrakeType] = useState('')
  const [itemBagLocation, setItemBagLocation] = useState('')
  const [itemFuelType, setItemFuelType] = useState('')
  const [itemLightingType, setItemLightingType] = useState('')
  const [itemImages, setItemImages] = useState([])
  const [itemWaterproofRating, setItemWaterproofRating] = useState('')
  const [itemDimensions, setItemDimensions] = useState('')


  const [categoriesFromDB, setCategoriesFromDB] = useState([])

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  // check for a user and add their id to the state that will eventually be the whole user's item object
  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (userInFireBaseWorld) => {
        if (userInFireBaseWorld) {
          fetchCategoriesFromDB();
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

  useEffect(() => {
    if(itemSubCategoryId === "1"){
      setItemAtType("tent")
    }
    if(itemSubCategoryId === "2"){
      setItemAtType("bivvy_bag")
    }
    if(itemSubCategoryId === "3"){
      setItemAtType("sleeping_bag")
    }
    if(itemSubCategoryId === "4"){
      setItemAtType("sleeping_mat")
    }
    if(itemSubCategoryId === "5"){
      setItemAtType("road")
    }
    if(itemSubCategoryId === "6"){
      setItemAtType("off_road")
    }
    if(itemSubCategoryId === "7"){
      setItemAtType("insulated")
    }
    if(itemSubCategoryId === "8"){
      setItemAtType("waterproof")
    }
    if(itemSubCategoryId === "9"){
      setItemAtType("crockery")
    }
    if(itemSubCategoryId === "10"){
      setItemAtType("stove")
    }
    if(itemSubCategoryId === "11"){
      setItemAtType("navigation")
    }
    if(itemSubCategoryId === "12"){
      setItemAtType("power_bank")
    }
    if(itemSubCategoryId === "13"){
      setItemAtType("lighting")
    }
  }, [itemSubCategoryId])

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
  

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dataToSubmit = {
      "@type": itemAtType,
      name: itemName,
      brand: itemBrand,
      ratings: [],
      comments: [],
      category: {
        id: itemCategoryId},
      user: {
        fireBaseId: userData.fireBaseId
      },
      subCategory: {
        id: itemSubCategoryId
      },
      waterproofRatingType: itemWaterproofRating,
      size: itemSize,
      capacity: itemCapacity,
      weight: itemWeight,
      rechargeable: itemRechargeableBoolean,
      hooped: itemHoopedBoolean,
      packSize: itemPackSize,
      diameter: itemDiameter,
      insulationType: itemInsulationType,
      lightingType: itemLightingType,
      lumens: itemLumens,
      suspensionType: itemSuspension,
      dimensions: itemDimensions,
      brakeType: itemBrakeType,
      comfortRating: itemComfortRating,
      seasonType: itemSeasonType,
      thickness: itemThickness,
      allInOne: itemSetBoolean,
      fuelType: itemFuelType,
      footprint: itemFootprintBoolean,
      poleType: itemPoleType,
      // images: {},
    }


    // if (images.length > 6) {
    //   setLoading(false);
    //   toast.error("Cannot upload more than 6 images");
    //   return;
    // }

    // // store images in firebase
    // const storeImage = async (image) => {
    //   return new Promise((resolve, reject) => {
    //     // Create a root reference
    //     const storage = getStorage();
    //     // create dynamic filename
    //     const fileName = `${image.name}-${uuidv4()}`;

    //     // Create a storage reference
    //     const storageRef = ref(storage, "images/" + fileName);

    //     // Upload the file
    //     const uploadTask = uploadBytesResumable(storageRef, image);

    //     // Register three observers:
    //     // 1. 'state_changed' observer, called any time the state changes
    //     // 2. Error observer, called on failure
    //     // 3. Completion observer, called on successful completion
    //     uploadTask.on(
    //       "state_changed",
    //       (snapshot) => {
    //         // Observe state change events such as progress, pause, and resume
    //         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //         const progress =
    //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //         console.log("Upload is " + progress + "% done");
    //         switch (snapshot.state) {
    //           case "paused":
    //             console.log("Upload is paused");
    //             break;
    //           case "running":
    //             console.log("Upload is running");
    //             break;
    //         }
    //       },
    //       (error) => {
    //         switch (error.code) {
    //           case "storage/unauthorized":
    //             // User doesn't have permission to access the object
    //             break;
    //           case "storage/canceled":
    //             // User canceled the upload
    //             break;

    //           // ...

    //           case "storage/unknown":
    //             // Unknown error occurred, inspect error.serverResponse
    //             break;
    //         }
    //       },
    //       () => {
    //         // Handle successful uploads on complete
    //         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //           resolve(downloadURL);
    //         });
    //       }
    //     );
    //   });
    // };

    // // map through each image that will be uploaded and await all the promises to be completed
    // const imgUrls = await Promise.all(
    //   [...images].map((image) => storeImage(image))
    // ).catch(() => {
    //   setLoading(false);
    //   toast.error("Images could not be uploaded");
    //   return;
    // });

    // const formDataCopy = {...formData, imgUrls}
    // delete formDataCopy.images;
    // console.log(formDataCopy)
    
    const requestOptions = {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body:JSON.stringify(dataToSubmit)
    }

    const response = await fetch("http://localhost:8080/items", requestOptions);
    if (response.ok) {
      navigate("/kit");
    }
    console.log(dataToSubmit)
  };

  const handleDimensionsChange = (e) => {
    setItemDimensions(e.target.value)
  }

  const handleWaterproofRatingEnum = (e) => {
    setItemWaterproofRating(e.target.value)
  }

  const handleLightingTypeEnum = (e) => {
    setItemLightingType(e.target.value)
  }

  const handleFuelTypeEnum = (e) => {
    setItemFuelType(e.target.value)
  }

  const handleBagLocationEnum = (e) => {
    setItemBagLocation(e.target.value)
  }

  const handleBrakeEnum = (e) => {
    setItemBrakeType(e.target.value)
  }

  const handleSuspensionEnum = (e) => {
    setItemSuspension(e.target.value)
  }

  const handleSeasonEnum = (e) => {
    setItemSeasonType(e.target.value)
  }

  const handleInsulationTypeEnum = (e) => {
    setItemInsulationType(e.target.value)
  }

  const handlePoleTypeEnum = (e) => {
    setItemPoleType(e.target.value)
  }

  const handleRechargeableBoolean = (e) => {
    setItemRechargeableBoolean(e.target.value)
  }

  const handleLumenChange = (e) => {
    setItemLumens(e.target.value)
  }

  const handleSetBooleanChange = (e) => {
    setItemSetBoolean(e.target.value)
  }

  const handleDiameterChange = (e) => {
    setItemDiameter(e.target.value)
  }

  const handleItemSizeChange = (e) => {
    setItemSize(e.target.value)
  }

  const handleItemThicknessChange = (e) => {
    setItemThickness(e.target.value)
  }

  const handleComfortRatingChange = (e) => {
    setItemComfortRating(e.target.value)
  }

  const handleFootprintBoolean = (e) => {
    setItemFootprintBoolean(e.target.value)
  }

  const handleCapacityChange = (e) => {
    setItemCapacity(e.target.value)
  }

  const handleWeightChange = (e) => {
    setItemWeight(e.target.value)
  }

  const handleItemHoopedBoolean = (e) => {
    setItemHoopedBoolean(e.target.value)
  }

  const handlePackSizeChange = (e) => {
    setItemPackSize(e.target.value)
  }

  const handleNameChange = (e) => {
    setItemName(e.target.value)
  }

  const handleBrandChange = (e) => {
    setItemBrand(e.target.value)
  }


  const handleSubCategoryChange = (e) => {
    setItemSubCategoryId(e.target.value)
  }


  const handleCatgoryChange = (e) => {
    setItemCategoryId(e.target.value)
  }

  const handleImageUploads = (e) => {
    setItemImages(e.target.files)
  }

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
              <label htmlFor="category">Select a category:</label>
              <select name="category" id="category" onChange={handleCatgoryChange}>
              <option value="">Please choose a category</option>
              {categoriesFromDB.map((category, index) => (
                <option key={index} value={category.id}>{category.categoryName}</option>
              ))}
              </select>
            </div>

            <div className="options">
              <label htmlFor="subCategory.id">Select a subcategory</label>
              <select name="subCategory.id" id="subCategory.id" onChange={handleSubCategoryChange}>
                <option value="">Please choose a subcategory</option>
                {itemCategoryId === "1" && (
                  <>
                    <option value="3">Sleeping Bag</option>
                    <option value="4">Sleeping Mat</option>
                    <option value="1">Tent</option>
                    <option value="2">Bivvy</option>
                  </>
                )}
                {itemCategoryId === "3" && (
                  <>
                    <option value="6">Off Road</option>
                    <option value="5">Road</option>
                  </>
                )}
                {itemCategoryId === "5" && (
                  <>
                    <option value="10">Stove</option>
                    <option value="9">Crockery</option>
                  </>
                )}
                {itemCategoryId === "6" && (
                  <>
                    <option value="13">Lighting</option>
                    <option value="12">PowerBank</option>
                  </>
                )}
                {itemCategoryId=== "4" && (
                  <>
                    <option value="7">Insulated</option>
                    <option value="8">Waterproof</option>
                  </>
                )}
                {itemCategoryId === "2" && (
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
                onChange={handleBrandChange}
              />
            </div>

            <div className="options">
              <label htmlFor="name">Name of item:</label>
              <input
                type="text"
                placeholder="e.g. SeatPack"
                id="name"
                onChange={handleNameChange}
              />
            </div>

            {itemSubCategoryId === "2" && (
              <>
                <div className="options">
                  <label htmlFor="packSize">Packed Size:</label>
                  <input
                    type="text"
                    placeholder="e.g. 10 x 15 x 20 cm"
                    id="packSize"
                    onChange={handlePackSizeChange}
                  />
                </div>

                <div className="options">
                  <label htmlFor="hooped">Hooped?</label>
                  <select name="hooped" id="hooped" onChange={handleItemHoopedBoolean}>
                    <option value="">Select Option</option>
                    <option value="True">True</option>
                    <option value="False">False</option>
                  </select>
                </div>

                <div className="options">
                  <label htmlFor="weight">Weight(g):</label>
                  <input
                    type="number"
                    placeholder="e.g. 500"
                    id="weight"
                    onChange={handleWeightChange}
                  />
                </div>
              </>
            )}

            {itemSubCategoryId === "1" && (
              <>
                <div className="options">
                  <label htmlFor="weight">Weight (g):</label>
                  <input
                    type="number"
                    placeholder="e.g. 500"
                    id="weight"
                    onChange={handleWeightChange}
                  />
                </div>

                <div className="options">
                  <label htmlFor="packSize">Packed Size:</label>
                  <input
                    type="text"
                    placeholder="e.g. 10 x 15 x 20 cm"
                    id="packSize"
                    onChange={handlePackSizeChange}
                  />
                </div>

                <div className="options">
                  <label htmlFor="capacity">Capacity (persons):</label>
                  <input
                    type="number"
                    placeholder="e.g. 1"
                    id="capacity"
                    onChange={handleCapacityChange}
                  />
                </div>

                <div className="options">
                  <label htmlFor="footprint">Footprint Included?</label>
                  <select name="footprint" id="footprint" onChange={handleFootprintBoolean}>
                    <option value="">Select Option</option>
                    <option value="True">True</option>
                    <option value="False">False</option>
                  </select>
                </div>

                <div className="options">
                  <label htmlFor="poleType">Pole type:</label>
                  <select name="poleType" id="poleType" onChange={handlePoleTypeEnum}>
                    <option value="">Select Option</option>
                    <option value="0">Poles</option>
                    <option value="1">AirBeam</option>
                  </select>
                </div>
              </>
            )}

            {itemSubCategoryId === "3" && (
              <>
                <div className="options">
                  <label htmlFor="weight">Weight (g):</label>
                  <input
                    type="number"
                    placeholder="e.g. 500"
                    id="weight"
                    onChange={handleWeightChange}
                  />
                </div>

                <div className="options">
                  <label htmlFor="packSize">Packed Size:</label>
                  <input
                    type="text"
                    placeholder="e.g. 10 x 15 x 20 cm"
                    id="packSize"
                    onChange={handlePackSizeChange}
                  />
                </div>

                <div className="options">
                  <label htmlFor="comfortRating">Comfort Rating (°C):</label>
                  <input
                    type="number"
                    placeholder="e.g. 3"
                    id="comfortRating"
                    onChange={handleComfortRatingChange}
                  />
                </div>

                <div className="options">
                  <label htmlFor="insulationType">Insulation type:</label>
                  <select name="insulationType" id="insulationType" onChange={handleInsulationTypeEnum}>
                    <option value="">Select Option</option>
                    <option value="0">Hybrid</option>
                    <option value="1">Down</option>
                    <option value="2">Synthetic</option>
                  </select>
                </div>

                <div className="options">
                  <label htmlFor="seasonRating">Season Rating:</label>
                  <select name="seasonRating" id="seasonRating" onChange={handleSeasonEnum}>
                    <option value="">Select Option</option>
                    <option value="0">One Season</option>
                    <option value="1">Two Season</option>
                    <option value="2">Three Season</option>
                    <option value="3">Four Season</option>
                  </select>
                </div>
              </>
            )}

            {itemSubCategoryId === "4" && (
              <>
                <div className="options">
                  <label htmlFor="weight">Weight (g):</label>
                  <input
                    type="number"
                    placeholder="e.g. 500"
                    id="weight"
                    onChange={handleWeightChange}
                  />
                </div>

                <div className="options">
                  <label htmlFor="packSize">Packed Size:</label>
                  <input
                    type="text"
                    placeholder="e.g. 10 x 15 x 20 cm"
                    id="packSize"
                    onChange={handlePackSizeChange}
                  />
                </div>

                <div className="options">
                  <label htmlFor="thickness">Thickness (cm):</label>
                  <input
                    type="number"
                    placeholder="e.g. 6"
                    id="thickness"
                    onChange={handleItemThicknessChange}
                  />
                </div>

                <div className="options">
                  <label htmlFor="seasonRating">Season Rating:</label>
                  <select name="seasonRating" id="seasonRating" onChange={handleSeasonEnum}>
                    <option value="">Select Option</option>
                    <option value="0">One Season</option>
                    <option value="1">Two Season</option>
                    <option value="2">Three Season</option>
                    <option value="3">Four Season</option>
                  </select>
                </div>
              </>
            )}

            {itemSubCategoryId === "6" && (
              <>
                <div className="options">
                  <label htmlFor="size">Size:</label>
                  <input
                    type="text"
                    placeholder="e.g. 58cm"
                    id="size"
                    onChange={handleItemSizeChange}
                  />
                </div>

                <div className="options">
                  <label htmlFor="suspensionType">Suspension Type:</label>
                  <select name="suspensionType" id="suspensionType" onChange={handleSuspensionEnum}>
                    <option value="">Select Option</option>
                    <option value="0">Full Suspension</option>
                    <option value="1">Hardtail</option>
                    <option value="2">Gravel (no suspension)</option>
                  </select>
                </div>
              </>
            )}

            {itemSubCategoryId === "5" && (
              <>
                <div className="options">
                  <label htmlFor="size">Size:</label>
                  <input
                    type="text"
                    placeholder="e.g. 58cm"
                    id="size"
                    onChange={handleItemSizeChange}
                  />
                </div>
                
                <div className="options">
                  <label htmlFor="brakeType">Brake Type:</label>
                  <select name="brakeType" id="brakeType" onChange={handleBrakeEnum}>
                    <option value="">Select Option</option>
                    <option value="0">Rim Brakes</option>
                    <option value="1">Disc Brakes</option>
                  </select>
                </div>
              </>
            )}

            {itemCategoryId === "2" && (
              <>
              <div className="options">
                  <label htmlFor="bagLocation">Bag Location:</label>
                  <select name="bagLocation" id="bagLocation" onChange={handleBagLocationEnum}>
                    <option value="">Select Option</option>
                    <option value="0">Rear Pannier</option>
                    <option value="1">Front Pannier</option>
                    <option value="2">Saddle Pack</option>
                    <option value="3">Frame Pack</option>
                    <option value="4">Top Tube</option>
                    <option value="5">Handlebar</option>
                    <option value="6">On Body</option>
                    <option value="7">Accessories</option>
                    <option value="7">Dry Bag</option>
                  </select>
                </div>

                <div className="options">
                  <label htmlFor="capacity">Capacity (L):</label>
                  <input
                    type="number"
                    placeholder="e.g. 15"
                    id="capacity"
                    onChange={handleCapacityChange}
                  />
                </div>
              </>
            )}

            {itemSubCategoryId === "10" && (
              <>
              <div className="options">
                  <label htmlFor="fuelType">Fuel Type:</label>
                  <select name="fuelType" id="fuelType" onChange={handleFuelTypeEnum}>
                    <option value="">Select Option</option>
                    <option value="0">Gas</option>
                    <option value="1">Alcohol</option>
                    <option value="2">MultiFuel</option>
                  </select>
                </div>

                <div className="options">
                  <label htmlFor="weight">Weight (g):</label>
                  <input
                    type="number"
                    placeholder="e.g. 500"
                    id="weight"
                    onChange={handleWeightChange}
                  />
                </div>

                <div className="options">
                  <label htmlFor="diameter">Diameter (cm):</label>
                  <input
                    type="number"
                    placeholder="e.g. 20"
                    id="diameter"
                    onChange={handleDiameterChange}
                  />
                </div>

                <div className="options">
                  <label htmlFor="allInOne">All In One Set?</label>
                  <select name="allInOne" id="allInOne" onChange={handleSetBooleanChange}>
                    <option value="">Select Option</option>
                    <option value="True">True</option>
                    <option value="False">False</option>
                  </select>
                </div>
              </>
            )}

            {itemSubCategoryId === "9" && (
              <>
                <div className="options">
                  <label htmlFor="weight">Weight (g):</label>
                  <input
                    type="number"
                    placeholder="e.g. 500"
                    id="weight"
                    onChange={handleWeightChange}
                  />
                </div>

                <div className="options">
                  <label htmlFor="diameter">Diameter (cm):</label>
                  <input
                    type="number"
                    placeholder="e.g. 20"
                    id="diameter"
                    onChange={handleDiameterChange}
                  />
                </div>

                <div className="options">
                  <label htmlFor="capacity">Capacity (L):</label>
                  <input
                    type="number"
                    placeholder="e.g. 5"
                    id="capacity"
                    onChange={handleCapacityChange}
                  />
                </div>
              </>
            )}

            {itemSubCategoryId === "13" && (
              <>
              <div className="options">
                  <label htmlFor="lightingType">Lighting Type:</label>
                  <select name="lightingType" id="lightingType" onChange={handleLightingTypeEnum}>
                    <option value="">Select Option</option>
                    <option value="0">Bike Light</option>
                    <option value="1">Headtorch</option>
                    <option value="2">Torch</option>
                    <option value="3">Tent Light</option>
                  </select>
                </div>

                <div className="options">
                  <label htmlFor="lumens">Lumens:</label>
                  <input
                    type="number"
                    placeholder="e.g. 500"
                    id="lumens"
                    onChange={handleLumenChange}
                  />
                </div>

                <div className="options">
                  <label htmlFor="rechargeable">Rechargeable?</label>
                  <select
                    name="rechargeable"
                    id="rechargeable"
                    onChange={handleRechargeableBoolean}>
                    <option value="">Select Option</option>
                    <option value="True">Yes</option>
                    <option value="False">No</option>
                  </select>
                </div>
              </>
            )}

            {itemSubCategoryId === "12" && (
              <>
                <div className="options">
                  <label htmlFor="capacity">Capacity (mAh):</label>
                  <input
                    type="number"
                    placeholder="e.g. 10000"
                    id="capacity"
                    onChange={handleCapacityChange}
                  />
                </div>

                <div className="options">
                  <label htmlFor="dimensions">Physical Size:</label>
                  <input
                    type="text"
                    placeholder="e.g. 10 x 15 x 2 cm"
                    id="size"
                    onChange={handleDimensionsChange}
                  />
                </div>

                <div className="options">
                  <label htmlFor="rechargeable">Rechargeable?</label>
                  <select
                    name="rechargeable"
                    id="rechargeable"
                    onChange={handleRechargeableBoolean}
                  >
                    <option value="">Select Option</option>
                    <option value="True">Yes</option>
                    <option value="False">No</option>
                  </select>
                </div>
              </>
            )}

            {itemSubCategoryId === "11" && (
              <>
                <div className="options">
                <label htmlFor="rechargeable">Rechargeable?</label>
                  <select
                    name="rechargeable"
                    id="rechargeable"
                    onChange={handleRechargeableBoolean}
                  >
                    <option value="">Select Option</option>
                    <option value="True">Yes</option>
                    <option value="False">No</option>
                  </select>
                </div>
              </>
            )}

            {itemSubCategoryId === "7" && (
              <>
                <div className="options">
                  <label htmlFor="size">Size:</label>
                  <input
                    type="text"
                    placeholder="e.g. Size 12"
                    id="size"
                    onChange={handleItemSizeChange}
                  />
                </div>
                
                <div className="options">
                  <label htmlFor="insulationType">Insulation type:</label>
                  <select name="insulationType" id="insulationType" onChange={handleInsulationTypeEnum}>
                    <option value="">Select Option</option>
                    <option value="0">Hybrid</option>
                    <option value="1">Down</option>
                    <option value="2">Synthetic</option>
                  </select>
                </div>
              </>
            )}

            {itemSubCategoryId === "8" && (
              <>
                <div className="options">
                  <label htmlFor="size">Size:</label>
                  <input
                    type="text"
                    placeholder="e.g. Size 12"
                    id="size"
                    onChange={handleItemSizeChange}
                  />
                </div>
                
                <div className="options">
                  <label htmlFor="waterproofRating">Waterproof Rating:</label>
                  <select name="waterproofRating" id="waterproofRating" onChange={handleWaterproofRatingEnum}>
                    <option value="">Select Option</option>
                    <option value="0">Under 5000mm</option>
                    <option value="1">5,001 - 10,000mm</option>
                    <option value="2">Over 10,001 mm</option>
                  </select>
                </div>
              </>
            )}

            {/* <div className="options">
              <label htmlFor="images">Select Images (max 6):</label>
              <input
                type="file"
                id="images"
                accept=".jpg,.jpeg"
                onChange={handleImageUploads}
                multiple
                required
                max="6"
                className="fileInput"
              />
            </div> */}

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
