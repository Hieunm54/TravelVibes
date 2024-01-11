import React from "react";
import { Link } from "react-router-dom";

const Card = ({ children, className }) => {
  return (
    <div
      className={`pt-3 pb-4 px-4 border-b last:border-0 border-gray-100 hover:bg-gray-100 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
