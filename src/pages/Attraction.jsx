import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { appRoutes } from "../enum/routes";
import { useDispatch, useSelector } from "react-redux";
import ButtonGroup from "../components/ButtonGroup";
import Button from "../components/Button";
import { addAttraction } from "../store/attractions";
import BackButton from "../components/BackButton";
import { getAttraction } from "../services/attractions";
import { createReview, getReviews } from "../services/reviews";
import AttractionInfo from "../components/AttractionInfo";
import Review from "../components/Review";
import FormInput from "../components/FormInput";

const IMAGE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

const Attraction = () => {
  const [details, setDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewInput, setReviewInput] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [uploadedImages, setUploadedImages] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleImagesUpload = (evt) => {
    setUploadedImages(evt.target.files);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const formData = new FormData();
    formData.append("content", reviewInput);
    formData.append("rating", reviewRating);
    if (uploadedImages) {
      for (let i = 0; i < uploadedImages.length; i++) {
        formData.append("images", uploadedImages[i]);
      }
    }

    try {
      await createReview(auth.token, id, formData);
      await getReviewList();
      setReviewInput("");
      setReviewRating(0);
      setUploadedImages(null);
    } catch (e) {
      toast.error("Unable to create review");
    }
  };

  const getAttractionDetails = async () => {
    try {
      const response = await getAttraction(auth.token, id);
      setDetails(response.data);
    } catch (e) {
      toast.error("Unable to retrieve attraction!");
    }
  };

  const getReviewList = async () => {
    try {
      const response = await getReviews(auth.token, id);
      setReviews(response.data);
    } catch (e) {
      toast.error("Unable to retrieve reviews!");
    }
  };

  const handleAddAttraction = () => {
    dispatch(addAttraction(details));
    navigate(appRoutes.NEW_POST);
  };

  useEffect(() => {
    getAttractionDetails();
    getReviewList();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <div className="px-5 pt-10 pb-2 border-b border-gray-300">
        <BackButton to={appRoutes.NEW_POST_FIND_ATTRACTIONS} text="Search" />
      </div>
      <div className="overflow-y-scroll">
        {details && (
          <AttractionInfo
            name={details.name}
            images={details.images}
            description={details.description}
            address={details.address}
          />
        )}
        <div className="px-5 mt-14">
          <h3 className="font-bold text-3xl">Reviews</h3>
          {details && (
            <p className="flex items-center space-x-2 mt-2">
              <FontAwesomeIcon
                icon="fa-solid fa-star"
                className="text-yellow-400"
              />
              <span>
                {details.rating ? parseFloat(details.rating).toFixed(1) : 0} of
                5
              </span>
            </p>
          )}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-3 mb-5 border-t border-gray-200 mt-5 pt-3"
            encType="multipart/form-data"
          >
            <h4 className="font-bold text-2xl">Write a review</h4>
            <FormInput
              multiline={true}
              name="Content"
              placeholder="Write your thoughts"
              value={reviewInput}
              onChange={(evt) => setReviewInput(evt.target.value)}
            />
            <FormInput
              type="number"
              value={reviewRating}
              name="Rating"
              onChange={(evt) => setReviewRating(evt.target.value)}
              min={1}
              max={5}
            />
            <FormInput
              type="file"
              name="Photos"
              multiple
              accept=".png, .jpg, .jpeg"
              onChange={handleImagesUpload}
            />
            <Button>Submit</Button>
          </form>
          {reviews.map((review) => (
            <Review
              key={review._id}
              avatar={`${IMAGE_URL}/${review.user.avatar}`}
              authorName={`${review.user.firstName} ${review.user.lastName}`}
              rating={review.rating}
              content={review.content}
              images={review.images}
            />
          ))}
        </div>
      </div>
      <ButtonGroup className="border-t border-gray-200">
        <Button onClick={handleAddAttraction}>
          <FontAwesomeIcon icon="fa-solid fa-plus" /> Add
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Attraction;
