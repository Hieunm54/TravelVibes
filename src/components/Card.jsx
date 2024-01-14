import React from "react";
import { Link } from "react-router-dom";

const Card = ({ children, className }) => {
  return (
    <div
      className={`bg-white mb-3 last:mb-0 pt-3 pb-4 px-4 hover:cursor-pointer rounded-md ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
