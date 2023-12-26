import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const BackButton = ({ to, text }) => {
  return (
    <Link to={to} className="inline-block hover:text-blue-500">
      <div className="flex items-center space-x-2">
        <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
        <span>{text}</span>
      </div>
    </Link>
  );
};

export default BackButton;
