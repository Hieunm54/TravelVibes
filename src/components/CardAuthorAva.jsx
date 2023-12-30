import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardAuthorAva = ({ size = 12, src }) => {
  const imgSize = `w-${size} h-${size}`;

  return (
    <>
      {src ? (
        <img
          src={src}
          className={`${imgSize} rounded-full border border-gray-200`}
        />
      ) : (
        <FontAwesomeIcon icon="fa-solid fa-circle-user" className={imgSize} />
      )}
    </>
  );
};

export default CardAuthorAva;
