import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { toast } from "react-toastify";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { appRoutes } from "../enum/routes";
import { useDispatch, useSelector } from "react-redux";
import ButtonGroup from "../components/ButtonGroup";
import Button from "../components/Button";
import { addAttraction } from "../store/attractions";
import { authorizationHeader } from "../services/jwt";

const API_URL = import.meta.env.VITE_API_URL;

const Attraction = () => {
  const [details, setDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const slideSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const getAttraction = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/attractions/${id}`, {
        headers: {
          Authorization: authorizationHeader(auth.token),
        },
      });
      setDetails(response.data);
    } catch (e) {
      toast.error("Unable to retrieve attraction!");
    }
  };

  const getReviews = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/reviews/${id}`, {
        headers: {
          Authorization: authorizationHeader(auth.token),
        },
      });
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
    getAttraction();
    getReviews();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <div className="px-5 pt-10 pb-2 border-b border-gray-300">
        <Link
          to={appRoutes.NEW_POST_FIND_ATTRACTIONS}
          className="inline-block hover:text-blue-500"
        >
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
            <span>Search</span>
          </div>
        </Link>
      </div>
      <div className="overflow-y-scroll">
        {details && (
          <div className="mt-5 px-5">
            <h3 className="font-bold text-4xl">{details.name}</h3>
            <div>
              <Slider {...slideSettings}>
                {details.images.map((image) => (
                  <img
                    src={image}
                    className="block w-full"
                    alt={details.name}
                  />
                ))}
              </Slider>
            </div>
            <p className="mt-2">{details.description}</p>
            <address className="mt-2">
              <span className="font-bold">Address:</span> {details.address}
            </address>
          </div>
        )}
        <div className="px-5 mt-5">
          {reviews.map((review) => (
            <div key={review._id} className="border-t border-gray-200 py-2">
              <h4 className="text-xl font-bold">
                {review.user.firstName} {review.user.lastName}
              </h4>
              <div className="flex items-center mt-1 text-lg text-yellow-400">
                {Array.from(Array(review.rating), (_, i) => (
                  <FontAwesomeIcon key={i} icon="fa-solid fa-star" />
                ))}
                {Array.from(Array(5 - review.rating), (_, i) => (
                  <FontAwesomeIcon key={i} icon="fa-regular fa-star" />
                ))}
              </div>
              <p className="mt-2">{review.content}</p>
            </div>
          ))}
        </div>
      </div>
      <ButtonGroup className="border-t border-gray-200">
        <Button onClick={handleAddAttraction}>
          <FontAwesomeIcon icon="fa-solid fa-plus" /> Add
        </Button>
        <Button>Write a review</Button>
      </ButtonGroup>
    </div>
  );
};

export default Attraction;
