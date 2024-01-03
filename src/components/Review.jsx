import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slider from "react-slick";
import { CONST } from "../constaints";
import CardAuthorAva from "./CardAuthorAva";

const slideSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
};

const Review = ({ authorName, images, rating, content, avatar, className }) => {
  return (
    <div
      className={`first:border-0 border-t border-gray-200 py-2 ${className}`}
    >
      <div className="flex items-center space-x-2">
        <CardAuthorAva size={14} src={avatar} />
        <h4 className="text-xl font-bold">{authorName}</h4>
      </div>
      <div className="flex items-center mt-3 text-lg text-yellow-400">
        {Array.from(Array(rating), (_, i) => (
          <FontAwesomeIcon key={i} icon="fa-solid fa-star" />
        ))}
        {Array.from(Array(5 - rating), (_, i) => (
          <FontAwesomeIcon key={i} icon="fa-regular fa-star" />
        ))}
      </div>
      <p className="mt-3">{content}</p>
      <Slider {...slideSettings} className="mt-5">
        {images.map((image, index) => (
          <img
            key={image._id}
            src={`${CONST.IMAGE_URL}/${image.fileName}`}
            className="block w-full rounded-sm"
            alt={`${authorName}'s photos`}
          />
        ))}
      </Slider>
    </div>
  );
};

export default Review;
