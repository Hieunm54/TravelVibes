import React from "react";
import Slider from "react-slick";

const slideSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const AttractionInfo = ({ name, images, description, address }) => {
  return (
    <div className="mt-5 px-5">
      <h3 className="font-bold text-4xl">{name}</h3>
      <div>
        <Slider {...slideSettings} className="mt-5 mb-10">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              className="block w-full rounded-sm"
              alt={name}
            />
          ))}
        </Slider>
      </div>
      <p className="mt-2">{description}</p>
      <address className="mt-5">
        <span className="font-bold">Address:</span> {address}
      </address>
    </div>
  );
};

export default AttractionInfo;
