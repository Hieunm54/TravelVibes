import React from "react";

const CardAuthorAva = ({ size = 12, src }) => {
  return (
    <img
      src={
        src
          ? src
          : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
      }
      className={`w-${size} h-${size} rounded-full`}
    />
  );
};

export default CardAuthorAva;
