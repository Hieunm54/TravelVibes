import React from "react";
import { Link } from "react-router-dom";

const Card = ({ id, children }) => {
  return (
    <Link
      to={`/posts/${id}`}
      className="block border border-gray-200 w-4/5 bg-white p-3 rounded-sm"
    >
      {children}
    </Link>
  );
};

export default Card;
