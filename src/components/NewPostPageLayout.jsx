import React, { useState, useEffect, useRef } from "react";
import { NavigationControl, Popup } from "react-map-gl";
import VisitingLocationPopUpInfo from "../components/VisitingLocationPopUpInfo";
import MapMarker from "../components/MapMarker";
import Direction from "./Map/Direction";
import { useDispatch, useSelector } from "react-redux";
import Mapbox from "./Mapbox";
import { useMap } from "../hooks/map";
import { removeAttraction } from "../store/attractions";
import { toast } from "react-toastify";
import FormInput from "./FormInput";
import Button from "./Button";
import { Rating } from "@smastrom/react-rating";
import StarRatings from "react-star-ratings";
import { createReview } from "../services/reviews";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Star = (
  <path d="M62 25.154H39.082L32 3l-7.082 22.154H2l18.541 13.693L13.459 61L32 47.309L50.541 61l-7.082-22.152L62 25.154z" />
);

const myStyles = {
  itemShapes: Star,
  boxBorderWidth: 3,

  activeFillColor: ["#FEE2E2", "#FFEDD5", "#FEF9C3", "#ECFCCB", "#D1FAE5"],
  activeBoxColor: ["#da1600", "#db711a", "#dcb000", "#61bb00", "#009664"],
  activeBoxBorderColor: ["#c41400", "#d05e00", "#cca300", "#498d00", "#00724c"],

  inactiveFillColor: "white",
  inactiveBoxColor: "#dddddd",
  inactiveBoxBorderColor: "#a8a8a8",
};

const PostPageLayout = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const attractions = useSelector((state) => state.attractions);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [reviewInput, setReviewInput] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [uploadedImages, setUploadedImages] = useState(null);
  const [reviewPhotos, setReviewPhotos] = useState([]);
  const reviewPhotoInputRef = useRef();
  const { coordinates, mapRef, updateBounds } = useMap(attractions, (e) =>
    toast.error("Unable to retrieve attractions!")
  );

  const handleImagesUpload = (event) => {
    setUploadedImages(event.target.files);
  };

  const handleRating = (rate) => setReviewRating(rate);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("content", reviewInput);
    formData.append("rating", reviewRating);
    if (uploadedImages) {
      for (let i = 0; i < uploadedImages.length; i++) {
        formData.append("images", uploadedImages[i]);
      }
    }

    try {
      await createReview(auth.token, hoveredMarker.attraction._id, formData);
      setReviewInput("");
      setReviewRating(0);
      setReviewPhotos([]);
    } catch (e) {
      toast.error("Unable to create review");
    }
  };

  const handlePopUpClose = () => {
    console.log(hoveredMarker);
    setHoveredMarker(null);
  };

  const handlePopUpOpen = (attraction, index) => {
    setHoveredMarker({ attraction, index });
  };

  const handlePhotosSelected = (evt) => {
    if (evt.target.files) {
      setReviewPhotos(Array.from(evt.target.files));
    }
  };

  const handleChangeReviewPhotos = () => reviewPhotoInputRef.current.click();

  useEffect(() => {
    if (!mapRef) return;
    setHoveredMarker(null);
    updateBounds();
  }, [attractions, mapRef]);

  return (
    <div className="grid grid-cols-12 h-screen overflow-hidden">
      <section className="col-span-6 border-r-2 border-gray-300">
        {children}
      </section>
      <section className="col-span-6">
        <Mapbox ref={mapRef}>
          <NavigationControl
            className="navigation-control"
            showCompass={true}
          />
          {hoveredMarker && (
            <Popup
              longitude={hoveredMarker.attraction.coordinates[0]}
              latitude={hoveredMarker.attraction.coordinates[1]}
              onClose={handlePopUpClose}
              anchor="right"
              offset={10}
              closeOnClick={false}
              maxWidth="500px"
            >
              <VisitingLocationPopUpInfo
                name={hoveredMarker.attraction.name}
                address={hoveredMarker.attraction.address}
              />
              <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-3 mb-5 border-t border-gray-200 mt-5 pt-3"
                encType="multipart/form-data"
              >
                <h4 className="font-bold text-base">Write a review</h4>
                <div className="h-1/2">
                  <StarRatings
                    rating={reviewRating}
                    starRatedColor="#facc15"
                    starHoverColor="#eab308"
                    changeRating={handleRating}
                    numberOfStars={5}
                    name="rating"
                  />
                </div>
                <FormInput
                  multiline={true}
                  name="Description"
                  placeholder="Write your thoughts"
                  value={reviewInput}
                  onChange={(event) => setReviewInput(event.target.value)}
                />
                <div>
                  <label>Photos</label>
                  <div className="flex items-center overflow-x-scroll">
                    {reviewPhotos.map((photo) => (
                      <img src={URL.createObjectURL(photo)} className="w-1/3" />
                    ))}
                    <input
                      ref={reviewPhotoInputRef}
                      type="file"
                      name="Photos"
                      multiple
                      accept=".png, .jpg, .jpeg"
                      className="hidden"
                      onChange={handlePhotosSelected}
                    />
                    <button
                      onClick={handleChangeReviewPhotos}
                      className="block hover:text-blue-500"
                      type="button"
                    >
                      <FontAwesomeIcon
                        icon="fa-solid fa-square-plus"
                        className="w-14 h-14"
                      />
                    </button>
                  </div>
                </div>
                <Button>Submit</Button>
              </form>
            </Popup>
          )}
          {attractions.map((attraction, index) => (
            <MapMarker
              key={attraction._id}
              longitude={attraction.coordinates[0]}
              latitude={attraction.coordinates[1]}
              onClick={() => handlePopUpOpen(attraction, index)}
            />
          ))}
          {coordinates && <Direction coordinates={coordinates} />}
        </Mapbox>
      </section>
    </div>
  );
};

export default PostPageLayout;
