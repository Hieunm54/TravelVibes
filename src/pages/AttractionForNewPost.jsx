import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { appRoutes } from "../enum/routes";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import { addAttraction } from "../store/attractions";
import BackButton from "../components/BackButton";
import { getAttraction } from "../services/attractions";
import { getReviews } from "../services/reviews";
import AttractionInfo from "../components/AttractionInfo";
import { CONST } from "../constaints";
import AttractionReview from "../components/AttractionReview";

const Attraction = () => {
  const [details, setDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

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
      console.log(response.data);
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
    const interval = setInterval(() => {
      getAttractionDetails();
      getReviewList();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <div className="px-5 pt-10 pb-2 border-b border-gray-100 flex items-center justify-between">
        <BackButton to={appRoutes.NEW_POST_FIND_ATTRACTIONS} text="Search" />
        <Button onClick={handleAddAttraction}>
          <FontAwesomeIcon icon="fa-solid fa-plus" />
          <span>Add</span>
        </Button>
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
          <h3 className="font-bold text-xl">Reviews</h3>
          {details && (
            <p className="flex items-center space-x-2">
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
          <div className="mt-2">
            {reviews.map((review) => (
              <AttractionReview
                key={review._id}
                avatar={`${CONST.IMAGE_URL}/${review.user.avatar}`}
                authorName={`${review.user.firstName} ${review.user.lastName}`}
                rating={review.rating}
                content={review.content}
                images={review.images}
                attraction={review.attraction}
                createdAt={review.createdAt}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attraction;
