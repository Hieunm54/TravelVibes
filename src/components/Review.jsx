import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CONST } from "../constaints";
import CardAuthorAva from "./CardAuthorAva";
import { Link } from "react-router-dom";
import { appRoutes } from "../enum/routes";
import Carousel from "react-multi-carousel";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 2,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Review = ({
  authorName,
  images,
  rating,
  content,
  avatar,
  attraction,
  createdAt,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="grid grid-cols-12 gap-3 px-60 pt-5 pb-4 hover:cursor-pointer"
    >
      <CardAuthorAva size={10} src={avatar} />
      <div className="col-span-11">
        <div className="flex">
          <h4 className="font-bold">{authorName}</h4>
          <span className="px-1 text-gray-500">•</span>
          <time className="text-gray-500">
            {new Date(createdAt).toDateString()}
          </time>
        </div>
        <address>{attraction.name}</address>
        <div className="flex items-center mt-3 text-lg text-yellow-400">
          {Array.from(Array(rating), (_, i) => (
            <FontAwesomeIcon key={i} icon="fa-solid fa-star" />
          ))}
          {Array.from(Array(5 - rating), (_, i) => (
            <FontAwesomeIcon key={i} icon="fa-regular fa-star" />
          ))}
        </div>
        <p className="mt-3">{content}</p>
        <Carousel responsive={responsive} className="mt-3">
          {images.map((image) => (
            <img
              key={image._id}
              src={`${CONST.IMAGE_URL}/${image.fileName}`}
              className="block w-full rounded-sm"
              alt={`${authorName}'s photos`}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Review;
