import React from "react";
import { Link } from "react-router-dom";

const Card = ({ id, children }) => {
  return (
    <Link
      to={`/posts/${id}`}
      className="block border border-gray-200 w-5/6 bg-white p-3 rounded-lg shadow-xl"
    >
      {children}
    </Link>
  );
};

export default Card;
