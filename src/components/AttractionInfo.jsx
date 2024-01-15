import React from "react";
import Carousel from "react-multi-carousel";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const AttractionInfo = ({ name, images, description, address }) => {
  return (
    <div className="mt-5 px-5">
      <h3 className="font-bold text-3xl">{name}</h3>
      <div>
        <Carousel responsive={responsive} className="mt-3">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              className="block w-full max-h-full rounded-sm"
              alt={name}
            />
          ))}
        </Carousel>
      </div>
      <p className="mt-5">{description}</p>
      <address className="mt-5">
        <span className="font-bold">Address:</span> {address}
      </address>
    </div>
  );
};

export default AttractionInfo;
