import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slider from "react-slick";

const slideSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
};

const Review = ({ authorName, images, rating, content }) => {
  return (
    <div className="border-t border-gray-200 py-2">
      <h4 className="text-xl font-bold">{authorName}</h4>
      <div className="flex items-center mt-1 text-lg text-yellow-400">
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
            key={index}
            src={image}
            className="block w-full rounded-sm"
            alt={`${authorName}'s photos`}
          />
        ))}
      </Slider>
    </div>
  );
};

export default Review;
